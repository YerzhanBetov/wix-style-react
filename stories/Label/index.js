import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import AutoDocs from '../utils/Components/AutoDocs';
import CodeExample from '../utils/Components/CodeExample';
import LabelSource from '!raw-loader!../../src/Label/Label';
import TabbedView from '../utils/Components/TabbedView';
import ReadmeTestKit from '../../src/Label/README.TESTKIT.md';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

storiesOf('Core', module)
  .add('Label', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <AutoDocs source={LabelSource}/>
        <h1>Usage examples</h1>
        <CodeExample title="Standard" code={ExampleStandardRaw}>
          <ExampleStandard/>
        </CodeExample>
      </div>
      <Markdown source={ReadmeTestKit}/>
    </TabbedView>
  ));
