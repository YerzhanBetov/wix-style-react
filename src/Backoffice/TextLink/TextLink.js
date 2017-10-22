import PropTypes from 'prop-types';
import React from 'react';
import WixComponent from '../../BaseComponents/WixComponent';
import BaseTextLink from '../../BaseComponents/TextLink';

export default class TextLink extends WixComponent {

  static propTypes = {
    ...BaseTextLink.propTypes,
    link: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    download: PropTypes.bool,
    rel: PropTypes.string,
    target: PropTypes.string,
    ariaLabel: PropTypes.string
  };

  static defaultProps = {
    ...BaseTextLink.defaultProps,
    disabled: false,
    download: false,
    rel: null,
    target: null
  };

  render() {
    return (
      <BaseTextLink {...this.props}/>
    );
  }
}
