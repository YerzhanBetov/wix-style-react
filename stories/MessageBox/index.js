import React from 'react';
import {storiesOf} from '@storybook/react';
import TabbedView from '../utils/Components/TabbedView';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/MessageBox/README.md';
import ReadmeTestKit from '../../src/MessageBox/README.TESTKIT.md';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

storiesOf('9. Modals', module)
  .add('MessageBox', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <Markdown source={Readme}/>
        <h1>Usage examples</h1>
        <CodeExample title="Standard" code={ExampleStandardRaw}>
          <ExampleStandard/>
        </CodeExample>
      </div>
      <Markdown source={ReadmeTestKit}/>
    </TabbedView>
  ));
