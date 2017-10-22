import React from 'react';
import DropdownLayout from 'wix-style-react/DropdownLayout';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '140px',
  lineHeight: '22px'
};

const nodeStyle = {
  background: 'azure',
  paddingLeft: '25px'
};

const options = [
  {id: 0, value: 'Option 1'},
  {id: 1, value: 'Option 2'},
  {id: 2, value: 'Option 3'},
  {id: 3, value: 'Option 4'},
  {id: 4, value: 'Option 5'},
  {id: 5, value: 'Option 6'},
  {id: 6, value: 'Option 7'},
  {id: 7, value: 'Option 8'},
  {id: 8, value: 'Option 9'},
  {id: 9, value: 'Option 10'},
  {id: 10, value: 'Option 11'},
  {id: 11, value: 'Option 12'},
  {id: 12, value: 'Option 13'},
  {id: 13, value: 'Option 14'},
  {id: 14, value: 'Option 15'},
  {id: 15, value: 'Option 16'},
  {id: 16, value: 'Option 17'},
  {id: 17, value: 'Option 18'},
  {id: 18, value: 'Option 19'},
  {id: 19, value: 'Option 20'},
  {id: 20, value: 'Option 21'},
  {id: 21, value: 'Option 22'},
  {id: 22, value: 'Option 23'},
  {id: 23, value: 'Option 24'},
  {id: 24, value: 'Option 25'},
  {id: 25, value: 'Option 26'},
  {id: 26, value: 'Option 27'},
  {id: 27, value: 'Option 28'},
  {id: 28, value: 'Option 29'},
  {id: 29, value: 'Option 30'}
];

export default () =>
  <div>
    <div className="ltr" style={style}>
      30 options<br/>
      <DropdownLayout
        visible
        options={options}
        fixedFooter={<div style={nodeStyle}>I am a footer</div>}
        />
    </div>
  </div>;
