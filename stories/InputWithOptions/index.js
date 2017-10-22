import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/InputWithOptions/README.md';
import ReadmeTestkit from '../../src/InputWithOptions/README.TESTKIT.md';

import TabbedView from '../utils/Components/TabbedView';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleDropdownSize from './ExampleDropdownSize';
import ExampleDropdownSizeRaw from '!raw-loader!./ExampleDropdownSize';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

storiesOf('Core', module)
  .add('InputWithOptions', () => (
    <TabbedView tabs={['API', 'Testkit']}>
      <div>
        <Markdown source={Readme}/>

        <h1>Usage examples</h1>

        <CodeExample title="Standard" code={ExampleStandardRaw}>
          <ExampleStandard/>
        </CodeExample>

        <CodeExample title="Dropdown size" code={ExampleDropdownSizeRaw}>
          <ExampleDropdownSize/>
        </CodeExample>

        <CodeExample title="Controlled input" code={ExampleControlledRaw}>
          <ExampleControlled/>
        </CodeExample>
      </div>
      <div>
        <Markdown source={ReadmeTestkit}/>
      </div>
    </TabbedView>
  ));
