import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/ImageViewer/README.md';
import ReadmeTestkit from '../../src/ImageViewer/README.TESTKIT.md';

import TabbedView from '../utils/Components/TabbedView';
import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

storiesOf('Core', module)
  .add('ImageViewer', () => (
    <TabbedView tabs={['API', 'Testkit']}>
      <div>
        <Markdown source={Readme}/>
        <h1>Usage examples</h1>
        <CodeExample title="Standard" code={ExampleStandardRaw}>
          <ExampleStandard/>
        </CodeExample>
      </div>
      <div>
        <Markdown source={ReadmeTestkit}/>
      </div>
    </TabbedView>
  ));
