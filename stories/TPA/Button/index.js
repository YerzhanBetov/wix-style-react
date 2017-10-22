import React from 'react';
import {storiesOf} from '@storybook/react';
import Example from './Example';
import ExampleRaw from '!raw-loader!./Example';
import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';
import CodeExample from '../../utils/Components/CodeExample';
import WixStyleDecorator from '../decorators/WixStyleDecorator';
import Markdown from '../../utils/Components/Markdown';
import TabbedView from '../../utils/Components/TabbedView';
import Readme from '../../../src/TPA/Button/README.md';
import ReadmeTestKit from '../../../src/TPA/Button/README.TESTKIT.md';

storiesOf('TPA', module)
  .addDecorator(WixStyleDecorator)
  .add('Button', () => {
    return (
      <TabbedView tabs={['API', 'TestKits']}>
        <div>
          <Markdown source={Readme}/>
          <h1>Example</h1>
          <CodeExample title="Themes" code={ExampleRaw}>
            <Example/>
          </CodeExample>
          <CodeExample title="Controlled" code={ExampleControlledRaw}>
            <ExampleControlled/>
          </CodeExample>
        </div>
        <Markdown source={ReadmeTestKit}/>
      </TabbedView>
    );
  });
