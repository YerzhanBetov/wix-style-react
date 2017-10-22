import React from 'react';
import DropdownLayout from 'wix-style-react/DropdownLayout';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '140px',
  lineHeight: '22px'
};

const options = Array.apply(null, {length: 29}).map((_, i) => ({id: i, value: `Option ${i}`}));

export default () =>
  <div>
    <div className="ltr" style={style}>Left to right<br/><DropdownLayout theme="b2b" visible selectedId={0} options={options}/></div>
  </div>;
