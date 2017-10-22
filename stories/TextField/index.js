import React from 'react';
import {storiesOf} from '@storybook/react';
import InteractiveCodeExample from '../utils/Components/InteractiveCodeExample';
import Markdown from '../utils/Components/Markdown';

import Readme from '../../src/TextField/README.md';
import ExampleStandard from './ExampleStandard';

storiesOf('3. Inputs', module)
  .add('3.1 Text Field', () => {
    return (
      <div>
        <Markdown source={Readme}/>
        <InteractiveCodeExample title="Customize a <TextField/>">
          <ExampleStandard/>
        </InteractiveCodeExample>
      </div>
    );
  });
