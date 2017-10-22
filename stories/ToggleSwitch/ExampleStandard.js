import React from 'react';
import ToggleSwitch from 'wix-style-react/ToggleSwitch';

const style = {
  display: 'inline-block',
  padding: '0 25px 0 5px',
  lineHeight: '10px'
};

export default () =>
  <div>
    <div style={style}>Default not checked<br/><br/><ToggleSwitch/></div>
    <div style={style}>Default checked<br/><br/><ToggleSwitch checked/></div>
    <div style={style}>Default not checked disabled<br/><br/><ToggleSwitch disabled/></div>
    <div style={style}>Default checked disabled<br/><br/><ToggleSwitch checked disabled/></div>
  </div>;
