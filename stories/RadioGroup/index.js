import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import AutoDocs from '../utils/Components/AutoDocs';
import TabbedView from '../utils/Components/TabbedView';
import CodeExample from '../utils/Components/CodeExample';
import ReadmeTestKit from '../../src/RadioGroup/README.TESTKIT.md';

import RadioGroupSource from '!raw-loader!../../src/RadioGroup/RadioGroup';
import RadioGroupRadioSource from '!raw-loader!../../src/RadioGroup/RadioButton/RadioButton';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExamplevAlign from './ExamplevAlign';
import ExamplevAlignRaw from '!raw-loader!./ExamplevAlign';

import ExampleHorizontal from './ExampleHorizontal';
import ExampleHorizontalRaw from '!raw-loader!./ExampleHorizontal';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

storiesOf('4. Selection', module)
  .add('4.3 Radio Button Group', () => (
    <TabbedView tabs={['API Documentation', 'TestKits Documentation']}>
      <div>
        <AutoDocs source={RadioGroupSource}/>
        <AutoDocs source={RadioGroupRadioSource}/>

        <h1>Usage examples</h1>

        <CodeExample title="Standard" code={ExampleStandardRaw}>
          <ExampleStandard/>
        </CodeExample>

        <CodeExample title="vAlign" code={ExamplevAlignRaw}>
          <ExamplevAlign/>
        </CodeExample>

        <CodeExample title="Horizontal" code={ExampleHorizontalRaw}>
          <ExampleHorizontal/>
        </CodeExample>

        <CodeExample title="Controlled input" code={ExampleControlledRaw}>
          <ExampleControlled/>
        </CodeExample>
      </div>

      <Markdown source={ReadmeTestKit}/>
    </TabbedView>
  ));
