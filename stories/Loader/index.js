import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import AutoDocs from '../utils/Components/AutoDocs';
import CodeExample from '../utils/Components/CodeExample';
import TabbedView from '../utils/Components/TabbedView';
import ReadmeTestKit from '../../src/Loader/README.TESTKIT.md';
import LoaderSource from '!raw-loader!wix-style-react/Loader/Loader';

import ExampleSizes from './ExampleSizes';
import ExampleSizesRaw from '!raw-loader!./ExampleSizes';

import ExampleWithText from './ExampleWithText';
import ExampleWithTextRaw from '!raw-loader!./ExampleWithText';

storiesOf('Core', module)
  .add('Loader', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <AutoDocs source={LoaderSource}/>

        <h1>Usage examples</h1>

        <CodeExample title="Sizes" code={ExampleSizesRaw}>
          <ExampleSizes/>
        </CodeExample>

        <CodeExample title="WithText" code={ExampleWithTextRaw}>
          <ExampleWithText/>
        </CodeExample>
      </div>

      <Markdown source={ReadmeTestKit}/>
    </TabbedView>
  ));
