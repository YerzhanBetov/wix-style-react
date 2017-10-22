import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import TabbedView from '../utils/Components/TabbedView';
import ReadmeTestKit from '../../src/Modal/README.TESTKIT.md';
import Readme from '../../src/Modal/README.md';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

storiesOf('9. Modals', module)
  .add('Modal', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <Markdown source={Readme}/>

        <h1>Usage examples</h1>

        <CodeExample title="Controlled modal" code={ExampleControlledRaw}>
          <ExampleControlled/>
        </CodeExample>
      </div>
      <div>
        <Markdown source={ReadmeTestKit}/>
      </div>
    </TabbedView>
  ));
