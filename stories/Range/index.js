import React from 'react';
import {storiesOf} from '@storybook/react';
import InteractiveCodeExample from '../utils/Components/InteractiveCodeExample';
import Markdown from '../utils/Components/Markdown';

import Readme from '../../src/Range/README.md';
import ExampleStandard from './ExampleStandard';

storiesOf('3. Inputs', module)
  .add('3.7 Range', () => {
    return (
      <div>
        <Markdown source={Readme}/>
        <InteractiveCodeExample title="Customize a <Range/>">
          <ExampleStandard/>
        </InteractiveCodeExample>
      </div>
    );
  });
