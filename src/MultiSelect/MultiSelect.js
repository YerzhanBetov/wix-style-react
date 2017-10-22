import React from 'react';
import PropTypes from 'prop-types';
import InputWithOptions from '../InputWithOptions/InputWithOptions';
import InputWithTags from './InputWithTags';
import last from 'lodash/last';
import difference from 'difference';
import uniqueId from 'lodash/uniqueId';

class MultiSelect extends InputWithOptions {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.state = {pasteDetected: false};

    if (props.maxHeight) {
      console.warn('MultiSelect: maxHeight is deprecated, please use maxNumRows instead. maxHeight will not be supported starting from 03/12/2017');
    }
  }

  getUnselectedOptions() {
    const optionIds = this.props.options.map(option => option.id);
    const tagIds = this.props.tags.map(tag => tag.id);
    const unselectedOptionsIds = difference(optionIds, tagIds);
    return this.props.options.filter(option => unselectedOptionsIds.includes(option.id));
  }

  dropdownAdditionalProps() {
    return {
      options: this.getUnselectedOptions().filter(this.props.predicate),
      closeOnSelect: false
    };
  }

  closeOnSelect() {
    return false;
  }

  inputAdditionalProps() {
    return {
      inputElement: <InputWithTags maxHeight={this.props.maxHeight} maxNumRows={this.props.maxNumRows}/>,
      onKeyDown: this.onKeyDown,
      delimiters: this.props.delimiters,
      onPaste: this.onPaste
    };
  }

  onPaste() {
    this.setState({pasteDetected: true});
  }

  _onChange(event) {
    if (!this.state.pasteDetected) {
      this.setState({inputValue: event.target.value});
      this.props.onChange && this.props.onChange(event);
    } else {
      const delimitersRegexp = new RegExp(this.props.delimiters.join('|'), 'g');
      const value = event.target.value.replace(delimitersRegexp, ',');
      const tags = value.split(',').map(str => str.trim()).filter(str => str);

      this.clearInput();
      this.setState({pasteDetected: false});

      const suggestedOptions = tags
        .map(tag => {
          const tagObj = this.getUnselectedOptions().find(element => this.props.valueParser(element).toLowerCase() === tag.toLowerCase());
          return tagObj ? tagObj : {id: uniqueId('customOption_'), value: tag, theme: 'error'};
        });

      this.onSelect(suggestedOptions);
    }
  }


  _onSelect(option) {
    this.onSelect([option]);
  }

  _onManuallyInput(inputValue) {
    if (inputValue) {
      inputValue = inputValue.trim();
      if (this.closeOnSelect()) {
        this.hideOptions();
      }

      this.onManuallyInput(inputValue);
    } else {
      super.hideOptions();
    }
    this.clearInput();
  }

  onKeyDown(event) {
    const {tags, value, onRemoveTag, delimiters} = this.props;

    if (tags.length > 0 && (event.key === 'Delete' || event.key === 'Backspace') && value.length === 0) {
      onRemoveTag(last(tags).id);
    }

    if (event.key === 'Escape') {
      this.clearInput();
      super.hideOptions();
    }

    if (event.key === 'Enter' || event.key === 'Tab' || delimiters.includes(event.key)) {
      if (this.props.value.trim()) {
        this._onManuallyInput(this.state.inputValue);
        const unselectedOptions = this.getUnselectedOptions();
        const visibleOptions = unselectedOptions.filter(this.props.predicate);
        const maybeNearestOption = visibleOptions[0];

        if (maybeNearestOption) {
          this.onSelect([maybeNearestOption]);
        }

        this.clearInput();
      }
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  optionToTag({id, value, tag, theme}) {
    return tag ? {id, ...tag} : {id, label: value, theme};
  }

  onSelect(options) {
    this.clearInput();

    if (this.props.onSelect) {
      options = options.map(this.optionToTag);
      this.props.onSelect(options);
    }

    this.input.focus();
  }

  onManuallyInput(inputValue) {
    if (!inputValue) {
      this.input.blur();
      return;
    }

    if (this.props.onManuallyInput) {
      this.props.onManuallyInput(inputValue, this.optionToTag({id: uniqueId('customOption_'), value: inputValue}));
    }

    this.clearInput();
  }

  clearInput() {
    this.input.clear();
    if (this.props.onChange) {
      this.props.onChange({target: {value: ''}});
    }
  }
}

MultiSelect.propTypes = {
  ...InputWithOptions.propTypes,
  predicate: PropTypes.func,
  tags: PropTypes.array,
  maxHeight: PropTypes.string,
  maxNumRows: PropTypes.number,
  delimiters: PropTypes.array
};

MultiSelect.defaultProps = {
  ...InputWithOptions.defaultProps,
  predicate: () => true,
  tags: [],
  delimiters: [',']
};

export default MultiSelect;
