import React from 'react';
import {storiesOf} from '@storybook/react';
import InteractiveCodeExample from '../utils/Components/InteractiveCodeExample';
import Markdown from '../utils/Components/Markdown';

import ReadMe from '../../src/RichTextAreaComposite/README.md';
import RichTextAreaCompositeExample from './RichTextAreaCompositeExample';

storiesOf('3. Inputs', module)
	.add('3.4 RichTextAreaComposite', () => (
  <div>
    <Markdown source={ReadMe}/>
    <InteractiveCodeExample title="Customize a <RichTextAreaComposite/>">
      <RichTextAreaCompositeExample/>
    </InteractiveCodeExample>
  </div>
	));
