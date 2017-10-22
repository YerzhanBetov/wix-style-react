import React from 'react';
import Slider from './ControlledSlider';

const style = {
  padding: '0 5px 55px',
  width: '500px'
};

export default () =>
  <div style={{direction: 'rtl'}}>
    <div style={style}>Single handle<Slider rtl value={[3]} min={1} max={10}/></div>
  </div>;
