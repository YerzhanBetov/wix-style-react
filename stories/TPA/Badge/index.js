import React from 'react';
import {storiesOf} from '@storybook/react';
import Example, {CustomExample} from './Example';
import ExampleRaw from '!raw-loader!./Example';
import CodeExample from '../../utils/Components/CodeExample';
import WixStyleDecorator from '../decorators/WixStyleDecorator';
import Markdown from '../../utils/Components/Markdown';
import TabbedView from '../../utils/Components/TabbedView';
import Readme from '../../../src/TPA/Badge/README.md';
import ReadmeTestKit from '../../../src/TPA/Badge/README.TESTKIT.md';

storiesOf('TPA', module)
  .addDecorator(WixStyleDecorator)
  .add('Badge POC', () => {
    return (
      <TabbedView tabs={['API', 'TestKits']}>
        <div>
          <Markdown source={Readme}/>
          <h1>Example</h1>
          <CodeExample title="Themes" code={ExampleRaw}>
            <Example/>
          </CodeExample>
          <CodeExample title="Themes" code={ExampleRaw}>
            <CustomExample/>
          </CodeExample>
        </div>
        <Markdown source={ReadmeTestKit}/>
      </TabbedView>
    );
  });
