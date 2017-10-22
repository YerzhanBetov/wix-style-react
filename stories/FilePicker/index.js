import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import AutoDocs from '../utils/Components/AutoDocs';
import TabbedView from '../utils/Components/TabbedView';
import CodeExample from '../utils/Components/CodeExample';
import FilePickerSource from '!raw-loader!wix-style-react/FilePicker/FilePicker';
import ReadmeTestKit from '../../src/FilePicker/README.TESTKIT.md';

import Example from './Example';
import ExampleRaw from '!raw-loader!./Example';

storiesOf('Core', module)
  .add('FilePicker', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <AutoDocs source={FilePickerSource}/>

        <h1>Usage examples</h1>

        <CodeExample title="Standard" code={ExampleRaw}>
          <Example/>
        </CodeExample>
      </div>

      <Markdown source={ReadmeTestKit}/>
    </TabbedView>
  ));
