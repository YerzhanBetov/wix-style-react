import React from 'react';
import DropdownLayout from 'wix-style-react/DropdownLayout';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '240px',
  lineHeight: '22px'
};

const options = [
  {id: 0, value: 'Option 1'},
  {id: 1, value: 'Option 2'},
  {id: 2, value: 'Option 3'},
  {id: 3, value: 'Option 4'},
  {id: 'footer', overrideStyle: true, value: <div style={{height: '240px', padding: '20px', fontSize: '20', backgroundColor: '#F0F'}}>Click <a href="http://www.wix.com">here</a> to go to wix.</div>}
];

const rtlOptions = [
  {id: 0, value: 'אופציה 1'},
  {id: 1, value: 'אופציה 2'},
  {id: 2, value: 'אופציה 3'},
  {id: 3, value: 'אופציה 4'}
];

export default () =>
  <div>
    <div className="ltr" style={style}>Left to right<br/><DropdownLayout visible selectedId={0} options={options}/></div>
    <div className="rtl" style={style}>Right to left<br/><DropdownLayout visible selectedId={0} options={rtlOptions}/></div>
  </div>;
