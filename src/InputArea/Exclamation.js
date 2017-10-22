import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip';
import styles from './InputArea.scss';
import Error from '../Icons/dist/components/Error';

const Exclamation = ({errorMessage, tooltipPlacement, onTooltipShow}) =>
  <div className={styles.suffix}>
    <Tooltip
      dataHook="inputArea-tooltip" disabled={errorMessage.length === 0}
      placement={tooltipPlacement} onShow={onTooltipShow} alignment="center"
      hideDelay={100} content={errorMessage} moveBy={{x: 0, y: -10}} overlay="" maxWidth="250px"
      textAlign="left"
      >
      <div className={styles.errorIcon}><Error size="1.5em"/></div>
    </Tooltip>
  </div>;

Exclamation.defaultProps = {
  errorMessage: '',
  tooltipPlacement: 'right'
};

Exclamation.propTypes = {
  errorMessage: PropTypes.string,
  tooltipPlacement: PropTypes.oneOf(['right', 'left', 'top', 'bottom']),
  onTooltipShow: PropTypes.func
};

export default Exclamation;
