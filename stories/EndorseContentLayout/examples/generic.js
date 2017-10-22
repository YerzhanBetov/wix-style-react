import React from 'react';

import EndorseContentLayout from 'wix-style-react/EndorseContentLayout';
import {Button} from 'wix-style-react/Backoffice';

export default () =>
  <EndorseContentLayout
    head="Something interesting goes in the title"
    content="This is just a generic message. No harm, no pain."
    primaryCta={<Button onClick={() => alert('dont click me!')}>Button</Button>}
    />;
