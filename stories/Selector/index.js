import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import TabbedView from '../utils/Components/TabbedView';
import ReadmeTestKit from '../../src/Selector/README.TESTKIT.md';
import Readme from '../../src/Selector/README.md';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

storiesOf('4. Selection', module)
  .add('Selector', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <Markdown source={Readme}/>

        <h1>Usage examples</h1>

        <CodeExample title="Selector" code={ExampleControlledRaw}>
          <ExampleControlled/>
        </CodeExample>
      </div>
      <div>
        <Markdown source={ReadmeTestKit}/>
      </div>
    </TabbedView>
  ));
