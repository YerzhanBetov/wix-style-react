import React from 'react';
import {storiesOf} from '@storybook/react';
import LabelExample, {CustomStyleLabelExample} from './LabelExample';
import LabelExampleRaw from '!raw-loader!./LabelExample';
import CodeExample from '../../utils/Components/CodeExample';
import WixStyleDecorator from '../decorators/WixStyleDecorator';
import Markdown from '../../utils/Components/Markdown';
import TabbedView from '../../utils/Components/TabbedView';
import Readme from '../../../src/TPA/Label/README.md';
import ReadmeTestKit from '../../../src/TPA/Label/README.TESTKIT.md';

storiesOf('TPA', module)
  .addDecorator(WixStyleDecorator)
  .add('Label', () => {
    return (
      <TabbedView tabs={['API', 'TestKits']}>
        <div>
          <Markdown source={Readme}/>
          <CodeExample title={'Example'} code={LabelExampleRaw}>
            <LabelExample/>
          </CodeExample>
          <CodeExample title={'Custom CSS class Example'} code={LabelExampleRaw}>
            <CustomStyleLabelExample/>
          </CodeExample>
        </div>
        <Markdown source={ReadmeTestKit}/>
      </TabbedView>
    );
  });
