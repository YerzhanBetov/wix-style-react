import React from 'react';
import {storiesOf} from '@storybook/react';
import InteractiveCodeExample from '../utils/Components/InteractiveCodeExample';
import Markdown from '../utils/Components/Markdown';

import Readme from '../../src/Composite/FieldWithSelectionComposite/README.md';
import ExampleStandard from './ExampleStandard';

storiesOf('3. Inputs', module)
  .add('3.3 Field With Selection', () => {
    return (
      <div>
        <Markdown source={Readme}/>
        <InteractiveCodeExample title="Customize a <FieldWithSelection/>">
          <ExampleStandard/>
        </InteractiveCodeExample>
      </div>
    );
  });
