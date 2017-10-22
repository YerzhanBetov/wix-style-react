import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import TabbedView from '../utils/Components/TabbedView';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/AutoComplete/README.md';
import ReadmeTestKit from '../../src/AutoComplete/README.TESTKIT.md';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

import ExampleComplex from './ExampleComplex';
import ExampleComplexRaw from '!raw-loader!./ExampleComplex';

storiesOf('Core', module)
  .add('AutoComplete', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <Markdown source={Readme}/>
        <h1>Usage examples</h1>
        <CodeExample title="Standard" code={ExampleStandardRaw}>
          <ExampleStandard/>
        </CodeExample>
        <CodeExample title="Controlled input" code={ExampleControlledRaw}>
          <ExampleControlled/>
        </CodeExample>
        <CodeExample title="Complex input" code={ExampleComplexRaw}>
          <ExampleComplex/>
        </CodeExample>
      </div>
      <Markdown source={ReadmeTestKit}/>
    </TabbedView>
  ));
