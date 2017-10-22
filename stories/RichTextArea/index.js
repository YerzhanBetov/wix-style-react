import React from 'react';
import {storiesOf} from '@storybook/react';
import InteractiveCodeExample from '../utils/Components/InteractiveCodeExample';
import Markdown from '../utils/Components/Markdown';
import ReadmeTestkit from '../../src/RichTextArea/README.TESTKIT.md';

import TabbedView from '../utils/Components/TabbedView';
import ReadMe from '../../src/RichTextArea/README.md';
import RichTextAreaExample from './RichTextAreaExample';

storiesOf('Core', module)
  .add('RichTextArea', () => (
    <TabbedView tabs={['API', 'Testkit']}>
      <div>
        <Markdown source={ReadMe}/>
        <InteractiveCodeExample title="Customize a <RichTextArea/>">
          <RichTextAreaExample/>
        </InteractiveCodeExample>
      </div>
      <div>
        <Markdown source={ReadmeTestkit}/>
      </div>
    </TabbedView>
  ));
