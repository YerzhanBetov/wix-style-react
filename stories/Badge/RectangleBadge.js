import React from 'react';

import {Badge} from 'wix-style-react';

export default () => (
  <div>
    <Badge shape="rectangle">Default</Badge>&nbsp;
    <Badge type="primary" shape="rectangle">Primary</Badge>&nbsp;
    <Badge type="success" shape="rectangle">Success</Badge>&nbsp;
    <Badge type="info" shape="rectangle">Info</Badge>&nbsp;
    <Badge type="warning" shape="rectangle">Warning</Badge>&nbsp;
    <Badge type="danger" shape="rectangle">Danger</Badge>
  </div>
);
