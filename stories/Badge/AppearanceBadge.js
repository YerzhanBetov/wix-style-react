import React from 'react';

import {Badge} from 'wix-style-react';

export default () => (
  <div>
    <Badge appearance="H1">Default T1</Badge>&nbsp;
    <Badge appearance="H2" type="primary" dataHook="badgeH2Primary">Primary H2</Badge>&nbsp;
    <Badge appearance="T3.2" type="success">Success T3.2</Badge>&nbsp;
    <Badge appearance="T4" type="info">Info T4</Badge>&nbsp;
    <Badge appearance="T5.1" type="warning">Warning T5.1</Badge>&nbsp;
    <Badge appearance="T2.1" type="danger">Danger T1</Badge>
  </div>
);
