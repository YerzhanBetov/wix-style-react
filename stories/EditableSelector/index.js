import React from 'react';
import {storiesOf} from '@storybook/react';
import AutoDocs from '../utils/Components/AutoDocs';
import TabbedView from '../utils/Components/TabbedView';
import CodeExample from '../utils/Components/CodeExample';
import EditableSelectorSource from '!raw-loader!../../src/EditableSelector/EditableSelector';
import TestKitReadme from '../../src/EditableSelector/README.TESTKIT.md';
import Markdown from '../utils/Components/Markdown';

import CardWithEditableSelectorExample from './CardWithEditableSelector';
import CardWithEditableSelectorExampleRaw from '!raw-loader!./CardWithEditableSelector';

import PopoverWithEditableSelectorExample from './PopoverWithEditableSelector';
import PopoverhEditableSelectorExampleRaw from '!raw-loader!./PopoverWithEditableSelector';

storiesOf('4. Selection', module)
  .add('4.9 EditableSelector', () =>
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <AutoDocs source={EditableSelectorSource}/>

        <CodeExample title="Card With Editable Selector" code={CardWithEditableSelectorExampleRaw}>
          <CardWithEditableSelectorExample/>
        </CodeExample>

        <CodeExample title="Popover With Editable Selector" code={PopoverhEditableSelectorExampleRaw}>
          <PopoverWithEditableSelectorExample/>
        </CodeExample>

      </div>

      <div>
        <Markdown source={TestKitReadme}/>
      </div>
    </TabbedView>
  );
