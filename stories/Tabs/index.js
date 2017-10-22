import React from 'react';
import {storiesOf} from '@storybook/react';
import InteractiveCodeExample from '../utils/Components/InteractiveCodeExample';
import Markdown from '../utils/Components/Markdown';

import ReadMe from '../../src/Tabs/README.md';
import TabsExample from './TabsExample';

storiesOf('6. Navigation', module)
  .add('6.3 Tabs', () => (
    <div>
      <Markdown source={ReadMe}/>
      <InteractiveCodeExample title="Customize a <Tabs/>">
        <TabsExample/>
      </InteractiveCodeExample>
    </div>
  ));
