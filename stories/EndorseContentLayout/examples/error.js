import React from 'react';

import EndorseContentLayout from 'wix-style-react/EndorseContentLayout';
import {Button} from 'wix-style-react/Backoffice';

const secondaryCtaStyle = {
  fontSize: '14px',
  color: '#2b81cb',
  textDecoration: 'none'
};

export default () =>
  <EndorseContentLayout
    head="Oops… Something Went Wrong"
    content="We’re sorry, the application is experiencing problems. Please refresh the page or give it a try later. If the problem persists please contact Support."
    primaryCta={<Button theme="fullred" onClick={() => alert('im trying!')}>Try Again</Button>}
    secondaryCta={<a href="#" style={secondaryCtaStyle}>Cancel</a>}
    />;
