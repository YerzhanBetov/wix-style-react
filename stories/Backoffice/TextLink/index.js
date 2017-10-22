import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../../utils/Components/Markdown';
import CodeExample from '../../utils/Components/CodeExample';
import Readme from '../../../src/Backoffice/TextLink/README.md';
import ReadmeTestkit from '../../../src/Backoffice/TextLink/README.TESTKIT.md';
import ReadmeAccessibility from '../../../src/Backoffice/TextLink/README.ACCESSIBILITY.md';

import TabbedView from '../../utils/Components/TabbedView';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleDark from './ExampleDark';
import ExampleDarkRaw from '!raw-loader!./ExampleDark';

const exampleBackoffice =
  (<div>
    <h1>Example</h1>

    <CodeExample title="Standard" code={ExampleStandardRaw}>
      <ExampleStandard/>
    </CodeExample>

    <CodeExample title="Dark" code={ExampleDarkRaw}>
      <ExampleDark/>
    </CodeExample>
  </div>);

storiesOf('Backoffice', module)
  .add('TextLink', () => (
    <TabbedView tabs={['API', 'Testkit', 'Accessibility']}>
      <div>
        <Markdown source={Readme}/>
        {exampleBackoffice}
      </div>
      <div>
        <Markdown source={ReadmeTestkit}/>
      </div>
      <div>
        <Markdown source={ReadmeAccessibility}/>
        {exampleBackoffice}
      </div>
    </TabbedView>
  ));
