import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import AutoDocs from '../utils/Components/AutoDocs';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/InputArea/README.md';
import ReadmeTestkit from '../../src/InputArea/README.TESTKIT.md';
import TabbedView from '../utils/Components/TabbedView';
import InputAreaSource from '!raw-loader!wix-style-react/InputArea/InputArea';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleError from './ExampleError';
import ExampleErrorRaw from '!raw-loader!./ExampleError';

import ExamplePaneltitleStyle from './ExamplePaneltitleStyle';
import ExamplePaneltitleStyleRaw from '!raw-loader!./ExamplePaneltitleStyle';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

import ExampleRefs from './ExampleRefs';
import ExampleRefsRaw from '!raw-loader!./ExampleRefs';

import ExampleSizes from './ExampleSizes';
import ExampleSizesRaw from '!raw-loader!./ExampleSizes';

storiesOf('Core', module)
  .add('InputArea', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <AutoDocs source={InputAreaSource}/>
        <Markdown source={Readme}/>

        <h1>Usage examples</h1>

        <CodeExample title="Standard" code={ExampleStandardRaw}>
          <ExampleStandard/>
        </CodeExample>

        <CodeExample title="Error" code={ExampleErrorRaw}>
          <ExampleError/>
        </CodeExample>

        <CodeExample title="PaneltitleStyle" code={ExamplePaneltitleStyleRaw}>
          <ExamplePaneltitleStyle/>
        </CodeExample>

        <CodeExample title="Controlled input" code={ExampleControlledRaw}>
          <ExampleControlled/>
        </CodeExample>

        <CodeExample title="Sizes" code={ExampleSizesRaw}>
          <ExampleSizes/>
        </CodeExample>

        <CodeExample title="Commands test" code={ExampleRefsRaw}>
          <ExampleRefs/>
        </CodeExample>
      </div>

      <Markdown source={ReadmeTestkit}/>
    </TabbedView>
  ));
