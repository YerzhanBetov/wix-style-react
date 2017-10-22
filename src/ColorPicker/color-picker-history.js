import React from 'react';
import {bool, object} from 'prop-types';

import css from './color-picker-history.scss';

const ColorPickerHistory = ({show, current, previous}) => {
  if (show) {
    return (
      <div className={css.root}>
        <div style={{background: previous.hex()}}/>
        <div style={{background: current.hex()}}/>
      </div>
    );
  }
  return null;
};

ColorPickerHistory.propTypes = {
  show: bool.isRequired,
  previous: object.isRequired,
  current: object.isRequired
};

export default ColorPickerHistory;
