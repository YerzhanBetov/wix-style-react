import debounce from 'lodash/debounce';
import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import Input from '../../Input';
import styles from './Search.scss';
import Finder from '../../Icons/dist/components/Finder';

class Search extends WixComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    delayTime: PropTypes.number,
    minimumChars: PropTypes.number
  };

  static defaultProps = {
    delayTime: 0,
    minimumChars: 1
  };

  fireChange = debounce(value => this.props.onChange(value), this.props.delayTime);

  onChange = e => {
    const {minimumChars} = this.props;
    const value = e.target.value;
    const charsLength = value.length;

    if (!charsLength || charsLength > minimumChars) {
      this.fireChange(value);
    }
  }

  render() {
    return (
      <Input
        id="search-input"
        placeholder="Search..."
        prefix={
          <div className={styles.search}>
            <Finder/>
          </div>
        }
        roundInput
        onChange={this.onChange}
        />
    );
  }
}

export default Search;
