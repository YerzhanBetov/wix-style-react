import React from 'react';
import {storiesOf} from '@storybook/react';
import AutoDocs from '../utils/Components/AutoDocs';
import CodeExample from '../utils/Components/CodeExample';
import TagSource from '!raw-loader!wix-style-react/Tag/Tag';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

storiesOf('Core', module)
  .add('Tag', () => (
    <div>
      <AutoDocs source={TagSource}/>

      <h1>Usage examples</h1>

      <CodeExample title="Standard" code={ExampleStandardRaw}>
        <ExampleStandard/>
      </CodeExample>
    </div>
  ));
