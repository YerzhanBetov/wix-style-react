import React from 'react';
import {storiesOf} from '@storybook/react';

import Markdown from '../utils/Components/Markdown';
import TabbedView from '../utils/Components/TabbedView';
import ReadmeTestKit from '../../src/PopoverMenu/README.TESTKIT.md';

storiesOf('Core', module)
  .add('PopoverMenu', () => (
    <TabbedView tabs={['TestKits']}>
      <div>
        <Markdown source={ReadmeTestKit}/>
      </div>
    </TabbedView>
  ));
