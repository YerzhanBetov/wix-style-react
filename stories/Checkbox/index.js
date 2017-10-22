import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';

import CheckboxSource from '!raw-loader!../../src/Checkbox/Checkbox';
import AutoDocs from '../utils/Components/AutoDocs';

import TabbedView from '../utils/Components/TabbedView';
import ReadmeTestKit from '../../src/Checkbox/README.TESTKIT.md';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleIndeterminate from './ExampleIndeterminate';
import ExampleIndeterminateRaw from '!raw-loader!./ExampleIndeterminate';

import ExampleRtl from './ExampleRtl';
import ExampleRtlRaw from '!raw-loader!./ExampleRtl';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

storiesOf('Core', module)
  .add('Checkbox', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <AutoDocs source={CheckboxSource}/>
        <h1>Usage examples</h1>
        <CodeExample title="Standard" code={ExampleStandardRaw}>
          <ExampleStandard/>
        </CodeExample>
        <CodeExample title="Indeterminate" code={ExampleIndeterminateRaw}>
          <ExampleIndeterminate/>
        </CodeExample>
        <CodeExample title="Rtl" code={ExampleRtlRaw}>
          <ExampleRtl/>
        </CodeExample>
        <CodeExample title="Controlled input" code={ExampleControlledRaw}>
          <ExampleControlled/>
        </CodeExample>
      </div>
      <Markdown source={ReadmeTestKit}/>
    </TabbedView>
  ));
