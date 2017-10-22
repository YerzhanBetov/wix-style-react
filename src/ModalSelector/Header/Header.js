import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import HeaderLayout from '../../MessageBox/HeaderLayout';

class Header extends WixComponent {
  static propTypes = {
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onClose: PropTypes.func
  }

  render() {
    const {
      title,
      onCancel,
      onClose
    } = this.props;
    return (
      <HeaderLayout title={title} onCancel={onClose ? onClose : onCancel}/>
    );
  }
}

export default Header;
