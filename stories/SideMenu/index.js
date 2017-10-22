import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/SideMenu/README.md';
import SideMenuDrillReadme from '../../src/SideMenu/DrillView/README.md';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleSubMenu from './ExampleSubMenu';
import ExampleSubMenuRaw from '!raw-loader!./ExampleSubMenu';

import ExampleSideMenuDrill from './ExampleSideMenuDrill';
import ExampleSideMenuDrillRaw from '!raw-loader!./ExampleSideMenuDrill';

storiesOf('Core', module)
  .add('SideMenu', () => (
    <div>
      <Markdown source={Readme}/>

      <h1>Usage examples</h1>

      <CodeExample title="Standard" code={ExampleStandardRaw}>
        <ExampleStandard/>
      </CodeExample>

      <CodeExample title="Sub Menu" code={ExampleSubMenuRaw}>
        <ExampleSubMenu/>
      </CodeExample>
    </div>
  ));


storiesOf('Core', module)
  .add('SideMenu Drill', () => (
    <div>
      <Markdown source={SideMenuDrillReadme}/>

      <h1>Usage examples</h1>

      <CodeExample title="SideMenu Example" code={ExampleSideMenuDrillRaw}>
        <ExampleSideMenuDrill/>
      </CodeExample>
    </div>
  ));
