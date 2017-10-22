import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from '../utils/Components/Markdown';
import Readme from '../../src/ButtonWithOptions/README.md';
import ExampleStandardComp from './ButtonWithOptionsStandard';
import InteractiveCodeExample from '../utils/Components/InteractiveCodeExample/InteractiveCodeExample';
import TabbedView from '../utils/Components/TabbedView';
import ReadmeTestkit from '../../src/ButtonWithOptions/README.TESTKIT.md';

storiesOf('4. Selection', module)
  .add('4.2 ButtonWithOptions', () => {
    return (
      <TabbedView tabs={['API', 'Testkit']}>
        <div>
          <Markdown source={Readme}/>
          <InteractiveCodeExample title="Customize a <ButtonWithOptions/>">
            <ExampleStandardComp/>
          </InteractiveCodeExample>
        </div>
        <div>
          <Markdown source={ReadmeTestkit}/>
        </div>
      </TabbedView>
    );
  });
