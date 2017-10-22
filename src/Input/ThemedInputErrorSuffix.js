import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import InputErrorSuffix from './InputErrorSuffix';
import Tooltip from '../Tooltip';

import Error from '../Icons/dist/components/Error';


import styles from './Input.scss';

const placementToMoveBy = {
  right: {x: 2, y: -10},
  left: {x: -2, y: -10},
  top: {x: 0, y: -10},
  bottom: {x: 0, y: -8}
};

const AmaterialErrorSuffix = ({focused, error, errorMessage, placement, onShow}) => focused ?
  null : <Tooltip
    dataHook="input-tooltip"
    disabled={!error && !errorMessage}
    placement={placement}
    maxWidth="230px"
    hideDelay={5}
    showDelay={5}
    active={focused}
    moveBy={placementToMoveBy[placement]}
    alignment="center"
    content={errorMessage}
    overlay=""
    textAlign="left"
    onShow={onShow}
    >
    <div className={classNames(styles.errorIcon, styles.suffix)}><Error size="1.5em"/></div>
  </Tooltip>;

AmaterialErrorSuffix.propTypes = {
  errorMessage: PropTypes.node.isRequired,
  error: PropTypes.bool,
  focused: PropTypes.bool,
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  onShow: PropTypes.func
};

AmaterialErrorSuffix.defaultProps = {
  placement: 'right'
};



class ThemedInputErrorSuffix extends InputErrorSuffix {
  render() {
    const {theme, focused, error, errorMessage, tooltipPlacement, onTooltipShow} = this.props;
    return theme === 'amaterial' ?
      <AmaterialErrorSuffix focused={focused} error={error} errorMessage={errorMessage} placement={tooltipPlacement} onShow={onTooltipShow}/> :
      super.render();
  }
}

ThemedInputErrorSuffix.propTypes = {
  tooltipPlacement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  onTooltipShow: PropTypes.func
};

export default ThemedInputErrorSuffix;
