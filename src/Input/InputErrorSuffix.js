import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../Tooltip';
import SvgExclamation from '../svg/Exclamation.js';
import styles from './Input.scss';

class InputErrorSuffix extends React.Component {
  render() {
    return (
      <Tooltip
        dataHook="input-tooltip"
        disabled={this.props.errorMessage.length === 0}
        placement="top"
        alignment="center"
        textAlign="left"
        content={this.props.errorMessage}
        overlay=""
        theme="dark"
        maxWidth="230px"
        hideDelay={150}
        >
        <div className={styles.exclamation}><SvgExclamation width={2} height={11}/></div>
      </Tooltip>
    );
  }
}

InputErrorSuffix.propTypes = {
  theme: PropTypes.oneOf(['normal', 'paneltitle', 'material', 'amaterial']),
  errorMessage: PropTypes.string.isRequired,
  focused: PropTypes.bool
};

export default InputErrorSuffix;
