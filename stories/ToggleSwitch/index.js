import React from 'react';
import story from '../utils/Components/Story';

import CodeExample from '../utils/Components/CodeExample';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleSizes from './ExampleSizes';
import ExampleSizesRaw from '!raw-loader!./ExampleSizes';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

story({
  category: 'Core',
  componentSrcFolder: 'ToggleSwitch',
  componentProps: (setProps, getProps) => ({
    onChange: () => setProps({checked: !getProps().checked})
  }),
  examples: (
    <div>
      <CodeExample title="Standard" code={ExampleStandardRaw}>
        <ExampleStandard/>
      </CodeExample>

      <CodeExample title="Sizes" code={ExampleSizesRaw}>
        <ExampleSizes/>
      </CodeExample>

      <CodeExample title="Controlled input" code={ExampleControlledRaw}>
        <ExampleControlled/>
      </CodeExample>
    </div>
  )
});
