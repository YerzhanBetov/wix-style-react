import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import InputWithOptions from '../InputWithOptions';
import {google2address, includes} from './google2address';
import styles from './GoogleAddressInput.scss';

/**
  * Address input box (using Google Maps)
  */
class GoogleAddressInput extends React.Component {
  constructor(params) {
    super(params);

    this.state = {
      suggestions: [],
      value: params.value || ''
    };

    this.autoCompleteRequestId = 0;
    this.geocodeRequestId = 0;

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onSet = this.onSet.bind(this);
    this.onManuallyInput = this.onManuallyInput.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this._getSuggestions(nextProps.value).then(suggestions => {
        this.setState({suggestions});
      }).catch(() => {
        // Nothing really to do...
        this.setState({suggestions: []});
      });
    }
  }

  render() {
    const {
      suggestions,
      value
    } = this.state;

    let options = suggestions.reduce((result, value) => {
      result.push({id: result.length, value: value.description});
      return result;
    }, []);

    if (this.props.footer) {
      options = options.concat({
        id: options.length,
        value: this.props.footer,
        ...this.props.footerOptions
      });
    }

    return (
      <div>
        <InputWithOptions
          ref={autocomplete => this.autocomplete = autocomplete}
          {...this.props}
          onInput={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onSelect={option => this.onSet(option.value)}
          onManuallyInput={this.onManuallyInput}
          value={value}
          options={options}
          fixedFooter={this.props.poweredByGoogle ? GoogleAddressInput.getGoogleFooter() : null}
          />
      </div>
    );
  }

  static getGoogleFooter = () =>
    <div className={styles.googleFooter} data-hook="google-footer"/>

  focus() {
    this.autocomplete.focus();
  }

  select() {
    this.autocomplete.select();
  }

  onChange(e) {
    const value = e.target.value;
    this.props.onChange && this.props.onChange(e);
    this.props.onSet && this.props.onSet(null);

    if (typeof this.props.value !== 'undefined') {
      // Controlled mode
      return;
    }

    this._getSuggestions(value).then(suggestions => {
      this.setState({suggestions});
    }).catch(() => {
      // Nothing really to do...
      this.setState({suggestions: []});
    });
  }

  onBlur() {
    this.props.onBlur && this.props.onBlur();

    if (this.props.clearSuggestionsOnBlur) {
      this.timer = setTimeout(() => {
        this.setState({suggestions: []});
      }, 250);
    }
  }

  onFocus() {
    this.props.onFocus && this.props.onFocus();
  }

  onSet(value) {
    const {
      Client,
      countryCode
    } = this.props;

    const suggestion = this.state.suggestions.find(s => s.description === value);

    this.setState({suggestions: [], value: this.props.value || value});

    const request = {
      region: countryCode,
      [suggestion ? 'placeId' : 'address']: suggestion ? suggestion.place_id : value
    };

    const requestId = ++this.geocodeRequestId;
    (new Client()).geocode({request}).then(results => {

      if (requestId !== this.geocodeRequestId) {
        return;
      }

      if (results.length === 0) {
        console.error('[GoogleAddressInput] Geocode returned no results on', value);
        this.props.onSet && this.props.onSet(null);
        // This shouldn't happen since we're running geocode on exactly the same
        // value returned by suggestions list
        return;
      }

      const result = {
        originValue: value,
        googleResult: results[0],
        address: google2address(results[0])
      };

      this.props.onSet && this.props.onSet(result);

    }).catch(e => {
      console.error('[GoogleAddressInput] Geocode failed on', value, e.message);
      this.props.onSet && this.props.onSet(null);
    });
  }

  onManuallyInput(value) {
    this._getSuggestions(value, typeof this.props.value !== 'undefined').then(suggestions => {

      if (suggestions.length === 0) {
        // No suggestion to the text entered
        this.props.onSet && this.props.onSet(null);
        return;
      }

      this.onSet(suggestions[0].description);
    });
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  _getSuggestions(value, skipSetState) {
    const {
      valuePrefix = '',
      countryCode,
      types,
      filterTypes,
      Client
    } = this.props;

    const requestId = ++this.autoCompleteRequestId;

    return new Promise(resolve => {

      if (skipSetState) {
        // Controlled mode
        resolve();
        return;
      }

      this.setState({value}, () => resolve());

    }).then(() => {
      if (value === '') {
        return Promise.resolve([]);
      }

      const request = {types, components: 'country:' + countryCode, input: valuePrefix + value};

      return (new Client()).autocomplete({request});
    }).then(results => {
      if (results.length === 0) {
        return Promise.resolve([]);
      }

      if (requestId !== this.autoCompleteRequestId) {
        return Promise.resolve([]);
      }

      if (filterTypes) {
        results = results.filter(result => includes(result.types, filterTypes));
      }

      return Promise.resolve(results);
    });
  }
}

GoogleAddressInput.displayName = 'GoogleAddressInput';

GoogleAddressInput.defaultProps = {
  magnifyingGlass: true,
  theme: Input.defaultProps.theme,
  autoSelect: true,
  footerOptions: {},
  clearSuggestionsOnBlur: true,
  poweredByGoogle: false
};

GoogleAddressInput.propTypes = {
  /** Placeholder for the input box */
  placeholder: PropTypes.string,

  /** Value to place before every search term (normally should not be used) */
  valuePrefix: PropTypes.string,

  /** Country code used to help with suggestions and geocoding */
  countryCode: PropTypes.string,

  /** Controlled mode - value to display */
  value: PropTypes.string,

  /** Limit the autocomplete to specific types (see [here](https://developers.google.com/places/supported_types#table3) for list) */
  types: PropTypes.array,

  /** Lower level filtering of autocomplete result types (see [here](https://developers.google.com/places/supported_types) for list)  */
  filterTypes: PropTypes.array,

  /** Should display error marker */
  error: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,

  /** Callback for results. Will return an object containing: originValue (value in the search), googleResult (google geocode result for the search), address (which will include: formatted (google formatted address), country, countryCode, street, number, postalCode, latLng (lat, lng)) */
  onSet: PropTypes.func,

  /** Google map client implementation (should implement autocomplete and geocode functions). Normally you would use wix-style-react/clients/GoogleMapsClient */
  Client: PropTypes.func.isRequired,

  /** Show or hide magnifying glass icon */
  magnifyingGlass: PropTypes.bool,
  theme: Input.propTypes.theme,

  /** Sets the input to readOnly */
  readOnly: PropTypes.bool,
  autoSelect: PropTypes.bool,

  /** Display a footer as the last suggestion in the list */
  footer: PropTypes.any,

  /** Set the footer's options (e.g. disabled, overrideStyles, etc. ) */
  footerOptions: PropTypes.object,

  /** Clear the suggestions list upon input blur */
  clearSuggestionsOnBlur: PropTypes.bool,

  /** Shows the Powered By Google credit in a fixed footer */
  poweredByGoogle: PropTypes.bool
};

export default GoogleAddressInput;
