import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/DataTable/README.md';
import TabbedView from '../utils/Components/TabbedView';
import ReadmeTestKit from '../../src/DataTable/README.TESTKIT.md';

import Example from './Example';
import ExampleRaw from '!raw-loader!./Example';

import ExampleCallingServer from './ExampleCallingServer';
import ExampleCallingServerRaw from '!raw-loader!./ExampleCallingServer';

import ExampleWithAnimatedRowDetails from './ExampleWithAnimatedRowDetails';
import ExampleWithAnimatedRowDetailsRaw from '!raw-loader!./ExampleWithAnimatedRowDetails';
import ExampleSortable from './ExampleSortable';
import ExampleSortableRaw from '!raw-loader!./ExampleSortable';

storiesOf('Core', module)
  .add('DataTable', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <Markdown source={Readme}/>
        <h1>Usage examples</h1>
        <CodeExample title="With infinite scroll" code={ExampleRaw}>
          <Example/>
        </CodeExample>
        <CodeExample title="With animated row details" code={ExampleWithAnimatedRowDetailsRaw}>
          <ExampleWithAnimatedRowDetails/>
        </CodeExample>
        <CodeExample title="With sorting" code={ExampleSortableRaw}>
          <ExampleSortable/>
        </CodeExample>
        <CodeExample title="With server calling (up to 100 items)" code={ExampleCallingServerRaw}>
          <ExampleCallingServer/>
        </CodeExample>
      </div>
      <div>
        <Markdown source={ReadmeTestKit}/>
      </div>
    </TabbedView>
  ));
