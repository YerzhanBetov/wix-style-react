import React from 'react';
import {storiesOf} from '@storybook/react';
import InteractiveCodeExample from '../utils/Components/InteractiveCodeExample';
import Markdown from '../utils/Components/Markdown';

import Readme from '../../src/GoogleAddressInputWithLabel/README.md';
import ExampleStandard from './ExampleStandard';

storiesOf('4. Selection', module)
  .add('4.8 Google address input', () => {
    return (
      <div>
        <Markdown source={Readme}/>
        <InteractiveCodeExample title="Customize a <GoogleAddressInputWithLabel/>">
          <ExampleStandard/>
        </InteractiveCodeExample>
      </div>
    );
  });
