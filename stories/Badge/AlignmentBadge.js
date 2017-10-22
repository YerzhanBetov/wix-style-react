import React from 'react';

import {Text, Badge} from 'wix-style-react';

export default () => (
  <div>
    <Text appearance="H0">I want to fly at <Badge alignment="top">top</Badge></Text>
    <Text appearance="H0">This fence <Badge alignment="middle">middle</Badge> is in the middle</Text>
    <Text appearance="H0">Worms are living at <Badge alignment="bottom">bottom</Badge></Text>
  </div>
);
