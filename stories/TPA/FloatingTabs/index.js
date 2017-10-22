import React from 'react';
import {storiesOf} from '@storybook/react';
import FloatingTabsExample from './FloatingTabsExample';
import FloatingTabsExampleRaw from '!raw-loader!./FloatingTabsExample';
import FloatingTabsCustomClassesExample from './FloatingTabsCustomClassesExample';
import FloatingTabsCustomClassesExampleRaw from '!raw-loader!./FloatingTabsCustomClassesExample';
import CodeExample from '../../utils/Components/CodeExample';
import WixStyleDecorator from '../decorators/WixStyleDecorator';
import Markdown from '../../utils/Components/Markdown';
import TabbedView from '../../utils/Components/TabbedView';
import Readme from '../../../src/TPA/FloatingTabs/README.md';
import ReadmeTestKit from '../../../src/TPA/FloatingTabs/README.TESTKIT.md';

storiesOf('TPA', module)
  .addDecorator(WixStyleDecorator)
  .add('FloatingTabs', () => {
    return (
      <TabbedView tabs={['API', 'TestKits']}>
        <div>
          <Markdown source={Readme}/>
          <h1>Example</h1>
          <CodeExample title="Default style tab" code={FloatingTabsExampleRaw}>
            <FloatingTabsExample/>
          </CodeExample>

          <CodeExample title="Custom style tab" code={FloatingTabsCustomClassesExampleRaw}>
            <FloatingTabsCustomClassesExample/>
          </CodeExample>
        </div>
        <Markdown source={ReadmeTestKit}/>
      </TabbedView>
    );
  });

