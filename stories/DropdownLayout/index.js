import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/DropdownLayout/README.md';
import ReadmeTestkit from '../../src/DropdownLayout/README.TESTKIT.md';
import TabbedView from '../utils/Components/TabbedView';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleManyOptions from './ExampleManyOptions';
import ExampleManyOptionsRaw from '!raw-loader!./ExampleManyOptions';

import ExampleReactElement from './ExampleReactElements';
import ExampleReactElementRaw from '!raw-loader!./ExampleReactElements';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

import ExampleControlledWithButtons from './ExampleControlledWithButtons';
import ExampleControlledRawWithButtons from '!raw-loader!./ExampleControlledWithButtons';

import ExampleTheme from './ExampleTheme';
import ExampleThemeRaw from '!raw-loader!./ExampleTheme';

storiesOf('Core', module)
  .add('DropdownLayout', () => (
    <TabbedView tabs={['API', 'Testkit']}>
      <div>
        <Markdown source={Readme}/>

        <h1>Usage examples</h1>

        <CodeExample title="Standard" code={ExampleStandardRaw}>
          <ExampleStandard/>
        </CodeExample>

        <div style={{paddingTop: '230px'}}/>

        <CodeExample title="Many options" code={ExampleManyOptionsRaw}>
          <ExampleManyOptions/>
        </CodeExample>

        <div style={{paddingTop: '251px'}}/>

        <CodeExample title="React elements" code={ExampleReactElementRaw}>
          <ExampleReactElement/>
        </CodeExample>

        <div style={{paddingTop: '143px'}}/>

        <CodeExample title="With theme" code={ExampleThemeRaw}>
          <ExampleTheme/>
        </CodeExample>

        <div style={{paddingTop: '230px'}}/>

        <CodeExample title="Controlled" code={ExampleControlledRaw}>
          <ExampleControlled/>
        </CodeExample>

        <CodeExample title="Controlled with buttons" code={ExampleControlledRawWithButtons}>
          <ExampleControlledWithButtons/>
        </CodeExample>

        <div style={{paddingTop: '230px'}}/>
      </div>
      <div>
        <Markdown source={ReadmeTestkit}/>
      </div>
    </TabbedView>
  ));
