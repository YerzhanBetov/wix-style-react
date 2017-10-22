import React from 'react';
import InputArea from 'wix-style-react/InputArea';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '200px',
  lineHeight: '22px'
};

export default () =>
  <div style={{display: 'flex'}}>
    <div className="ltr" style={style}>InputArea<br/><InputArea resizable/></div>
    <div className="ltr" style={style}>Focus<br/><InputArea forceFocus resizable/></div>
    <div className="ltr" style={style}>Hover<br/><InputArea forceHover resizable/></div>
    <div className="ltr" style={style}>With placeholder<br/><InputArea placeholder="duyg" resizable/></div>
  </div>;
