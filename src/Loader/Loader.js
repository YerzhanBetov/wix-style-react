import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';

import styles from './Loader.scss';

/**
  * General Loader
  */
class Loader extends WixComponent {
  render() {
    const {size, color, text} = this.props;
    const className = classnames(styles.loader, styles[size], styles[color]);
    return (
      <div className={className}>
        <div className={styles.wheel}/>
        { text && <div className={styles.text}>{text}</div> }
      </div>
    );
  }
}

Loader.displayName = 'Loader';

Loader.defaultProps = {
  size: 'medium',
  color: 'blue'
};

Loader.propTypes = {
  /** The size of loader */
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,

  /** Color of the loader */
  color: PropTypes.oneOf(['blue', 'white']).isRequired,

  /** Text to be shown below the loader */
  text: PropTypes.string
};

export default Loader;
