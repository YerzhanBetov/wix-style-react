import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import WixComponent from '../../BaseComponents/WixComponent';
import styles from './Image.scss';

const sizeMap = {
  'Tiny Square': 'tiny',
  'Small Square': 'small',
  Portrait: 'portrait',
  'Large Square': 'large',
  'Cinema View': 'cinema'
};

const types = ['Tiny Square', 'Small Square', 'Portrait', 'Large Square', 'Cinema View'];

class Image extends WixComponent {
  static propTypes = {
    imageSrc: PropTypes.string.isRequired,
    imageSize: PropTypes.oneOf(types)
  };

  static defaultProps = {
    imageSize: 'size1',
    alt: 'no image'
  };

  render() {
    const {
      imageSrc,
      imageSize,
      alt
    } = this.props;

    return (
      <img
        className={classNames(styles[`size-${sizeMap[imageSize]}`])}
        src={imageSrc}
        alt={alt}
        />
    );
  }
}

Image.types = types;

export default Image;
