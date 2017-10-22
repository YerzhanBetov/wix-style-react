import React from 'react';
import {storiesOf} from '@storybook/react';
import InteractiveCodeExample from '../utils/Components/InteractiveCodeExample';
import CheckboxInteractiveExample from './CheckboxInteractiveExample';

storiesOf('4. Selection', module)
.add('4.2 Checkbox', () => (
  <div>
    <h1>4.2 Checkbox</h1>
    <InteractiveCodeExample title="Customize a <Checkbox/>">
      <CheckboxInteractiveExample/>
    </InteractiveCodeExample>
  </div>
));
