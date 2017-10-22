import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/Dropdown/README.md';
import ReadmeTestkit from '../../src/Dropdown/README.TESTKIT.md';
import TabbedView from '../utils/Components/TabbedView';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

import ExampleWithCustomValue from './ExampleWithCustomValue';
import ExampleWithCustomValueRaw from '!raw-loader!./ExampleWithCustomValue';

storiesOf('Core', module)
  .add('Dropdown', () => (
    <TabbedView tabs={['API', 'Testkit']}>
      <div>
        <Markdown source={Readme}/>

        <h1>Usage examples</h1>

        <CodeExample title="Standard" code={ExampleStandardRaw}>
          <ExampleStandard/>
        </CodeExample>

        <CodeExample title="Controlled Dropdown" code={ExampleControlledRaw}>
          <ExampleControlled/>
        </CodeExample>

        <CodeExample title="Custom Values in Dropdown" code={ExampleWithCustomValueRaw}>
          <ExampleWithCustomValue/>
        </CodeExample>
      </div>
      <div>
        <Markdown source={ReadmeTestkit}/>
      </div>
    </TabbedView>
  ));
