import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../Tooltip';
import InputHelpSuffix from './InputHelpSuffix';

import InfoMaterial from '../Icons/dist/components/InfoMaterial';
import styles from './Input.scss';

const placementToMoveBy = {
  right: {x: 10, y: -10},
  left: {x: -10, y: -10},
  top: {x: 0, y: -5},
  bottom: {x: 0, y: -15}
};

const AmaterialHelpSuffix = ({help, helpMessage, placement, onShow}) =>
  <Tooltip
    dataHook="input-tooltip"
    disabled={!help || helpMessage.length === 0}
    maxWidth="230px"
    placement={placement}
    moveBy={placementToMoveBy[placement]}
    alignment="center"
    hideDelay={100}
    content={helpMessage}
    textAlign="left"
    overlay=""
    onShow={onShow}
    >
    <div className={styles.amaterialHelp}><InfoMaterial height="30" width="30"/></div>
  </Tooltip>;

AmaterialHelpSuffix.propTypes = {
  help: PropTypes.bool,
  helpMessage: PropTypes.node,
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  onShow: PropTypes.func
};

AmaterialHelpSuffix.defaultProps = {
  placement: 'right'
};


class ThemedInputHelpSuffix extends InputHelpSuffix {
  render() {
    const {theme, help, helpMessage, tooltipPlacement, onTooltipShow} = this.props;

    return theme === 'amaterial' ?
      <AmaterialHelpSuffix help={help} helpMessage={helpMessage} placement={tooltipPlacement} onShow={onTooltipShow}/> :
      super.render();
  }
}

ThemedInputHelpSuffix.propTypes = {
  tooltipPlacement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  onTooltipShow: PropTypes.func
};


export default ThemedInputHelpSuffix;
