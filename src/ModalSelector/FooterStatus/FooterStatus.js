import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import Checkbox from '../../Checkbox';

class FooterStatus extends WixComponent {
  static propTypes = {
    onCheckBoxClick: PropTypes.func,
    text: PropTypes.string,
    checked: PropTypes.bool
  }

  static defaultProps = {
    onCheckBoxClick: () => {}
  }

  render() {
    const {
      onCheckBoxClick,
      text,
      checked
    } = this.props;

    return (
      <Checkbox
        checked={checked}
        indeterminate
        onChange={() => onCheckBoxClick()}
        >
        {text}
      </Checkbox>
    );
  }
}

export default FooterStatus;
