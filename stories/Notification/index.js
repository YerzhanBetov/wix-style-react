import React from 'react';
import {storiesOf} from '@storybook/react';
import InteractiveCodeExample from '../utils/Components/InteractiveCodeExample';
import Markdown from '../utils/Components/Markdown';

import Readme from '../../src/Notification/README.md';
import ExampleStandard from './ExampleStandard';

storiesOf('8. Notification Bars', module)
  .add('8.1 Standard', () => {
    return (
      <div>
        <Markdown source={Readme}/>
        <InteractiveCodeExample title="Customize a <Notification/>">
          <ExampleStandard theme="standard"/>
        </InteractiveCodeExample>
      </div>
    );
  })
  .add('8.2 Error', () => {
    return (
      <div>
        <Markdown source={Readme}/>
        <InteractiveCodeExample title="Customize a <Notification/>">
          <ExampleStandard theme="error"/>
        </InteractiveCodeExample>
      </div>
    );
  })
  .add('8.3 Success', () => {
    return (
      <div>
        <Markdown source={Readme}/>
        <InteractiveCodeExample title="Customize a <Notification/>">
          <ExampleStandard theme="success"/>
        </InteractiveCodeExample>
      </div>
    );
  })
  .add('8.4 Warning', () => {
    return (
      <div>
        <Markdown source={Readme}/>
        <InteractiveCodeExample title="Customize a <Notification/>">
          <ExampleStandard theme="warning"/>
        </InteractiveCodeExample>
      </div>
    );
  })
  .add('8.5 Premium', () => {
    return (
      <div>
        <Markdown source={Readme}/>
        <InteractiveCodeExample title="Customize a <Notification/>">
          <ExampleStandard theme="premium"/>
        </InteractiveCodeExample>
      </div>
    );
  });
