import React from 'react';
import {storiesOf} from '@storybook/react';
import AutoDocs from '../utils/Components/AutoDocs';
import CodeExample from '../utils/Components/CodeExample';
import SliderSource from '!raw-loader!wix-style-react/Slider/Slider';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';
import ExampleRtl from './ExampleRtl';
import ExampleRtlRaw from '!raw-loader!./ExampleRtl';

storiesOf('Core', module)
  .add('Slider', () => (
    <div>
      <AutoDocs source={SliderSource}/>

      <h1>Usage examples</h1>

      <CodeExample title="Standard" code={ExampleStandardRaw}>
        <ExampleStandard/>
      </CodeExample>

      <CodeExample title="Standard RTL" code={ExampleRtlRaw}>
        <ExampleRtl/>
      </CodeExample>

      <CodeExample title="Controlled input" code={ExampleControlledRaw}>
        <ExampleControlled/>
      </CodeExample>
    </div>
  ));
