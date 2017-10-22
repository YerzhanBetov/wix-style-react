import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../Tooltip';
import Help from '../Icons/dist/components/Help';
import styles from './Input.scss';

class InputHelpSuffix extends React.Component {
  render() {
    return (
      <Tooltip
        dataHook="input-tooltip"
        disabled={this.props.helpMessage.length === 0}
        maxWidth="230px"
        placement="right"
        alignment="center"
        textAlign="left"
        hideDelay={100}
        content={this.props.helpMessage}
        overlay=""
        >
        <div className={styles.help}><Help height="20" width="20"/></div>
      </Tooltip>
    );
  }
}

InputHelpSuffix.propTypes = {
  theme: PropTypes.oneOf(['normal', 'paneltitle', 'material', 'amaterial']),
  helpMessage: PropTypes.string.isRequired,
  help: PropTypes.bool
};


export default InputHelpSuffix;
