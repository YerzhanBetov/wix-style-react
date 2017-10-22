import React from 'react';
import CodeExample from '../../utils/Components/CodeExample';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';
import IconsExample from './ExampleWithIcons';
import IconsExampleRaw from '!raw-loader!./ExampleWithIcons';

import story from '../../utils/Components/Story';
import * as Icons from 'wix-style-react/Icons';

const icons = Object.values(Icons).map(icon => React.createElement(icon));

story({
  category: 'Backoffice',
  storyName: 'Button',
  componentSrcFolder: 'Backoffice/Button',
  componentProps: {
    disabled: false,
    theme: 'fullblue',
    children: 'Click Me'
  },
  exampleProps: {
    onClick: () => 'Clicked!',
    onMouseEnter: () => 'Mouse Enter!',
    onMouseLeave: () => 'Mouse Leave!',
    prefixIcon: icons,
    suffixIcon: icons
  },
  examples: (
    <div>
      <CodeExample title="With icons" code={IconsExampleRaw}>
        <IconsExample/>
      </CodeExample>
      <CodeExample title="Controlled" code={ExampleControlledRaw}>
        <ExampleControlled/>
      </CodeExample>
    </div>
  )
});
