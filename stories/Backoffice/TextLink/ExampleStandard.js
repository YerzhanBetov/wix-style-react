import React, {Component} from 'react';
import {TextLink} from 'wix-style-react/Backoffice';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '340px',
  lineHeight: '22px'
};

class ControlledExample extends Component {

  render() {

    return (
      <div style={style}>
        <TextLink link="http://www.wix.com">Wix link</TextLink>
        <br/>
        <TextLink underlineStyle="always" link="http://www.wix.com">Wix link underline</TextLink>
        <br/>
        <TextLink underlineStyle="never" link="http://www.wix.com">Wix link without underline</TextLink>
        <br/>
        <TextLink size="small" ariaLabel="wix.com site" link="http://www.wix.com">Small link with ariaLabel</TextLink>
      </div>


    );
  }
}

export default () =>
  <ControlledExample/>;
