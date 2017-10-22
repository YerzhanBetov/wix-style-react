import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/EndorseContentLayout/README.md';

import Error from './examples/error';
import ErrorRaw from '!raw-loader!./examples/error';

import Generic from './examples/generic';
import GenericRaw from '!raw-loader!./examples/generic';

storiesOf('Core', module)
  .add('EndorseContentLayout', () => (
    <div>
      <Markdown source={Readme}/>

      <h1>Usage example</h1>

      <CodeExample title="Generic" code={GenericRaw}>
        <Generic/>
      </CodeExample>

      <CodeExample title="Error" code={ErrorRaw}>
        <Error/>
      </CodeExample>
    </div>
  ));

