import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import AutoDocs from '../utils/Components/AutoDocs';
import CodeExample from '../utils/Components/CodeExample';
import ReadmeTestkit from '../../src/LanguagePicker/README.TESTKIT.md';
import LanguagePickerSource from '!raw-loader!wix-style-react/LanguagePicker/LanguagePicker';

import TabbedView from '../utils/Components/TabbedView';

import Example from './Example';
import ExampleRaw from '!raw-loader!./Example';

storiesOf('Core', module)
  .add('LanguagePicker', () => (
    <TabbedView tabs={['API', 'Testkit']}>
      <div>
        <AutoDocs source={LanguagePickerSource}/>

        <h1>Usage examples</h1>

        <CodeExample title="Example" code={ExampleRaw}>
          <Example/>
        </CodeExample>
      </div>

      <Markdown source={ReadmeTestkit}/>
    </TabbedView>
  ));
