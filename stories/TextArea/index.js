import React from 'react';
import {storiesOf} from '@storybook/react';
import InteractiveCodeExample from '../utils/Components/InteractiveCodeExample';
import Markdown from '../utils/Components/Markdown';

import Readme from '../../src/TextArea/README.md';
import ExampleStandard from './ExampleStandard';

storiesOf('3. Inputs', module)
  .add('3.2 Text Area', () => {
    return (
      <div>
        <Markdown source={Readme}/>
        <InteractiveCodeExample title="Customize a <TextArea/>">
          <ExampleStandard/>
        </InteractiveCodeExample>
      </div>
    );
  });
