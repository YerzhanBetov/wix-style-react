import React from 'react';
import {storiesOf} from '@storybook/react';

import Markdown from '../../utils/Components/Markdown';
import AutoDocs from '../../utils/Components/AutoDocs';
import CodeExample from '../../utils/Components/CodeExample';
import TabbedView from '../../utils/Components/TabbedView';
import ReadmeTestKit from '../../../src/Tooltip/README.TESTKIT.md';
import TooltipSource from '!raw-loader!wix-style-react/Tooltip/Tooltip';

import ExamplePlacement from './ExamplePlacement';
import ExamplePlacementRaw from '!raw-loader!./ExamplePlacement';
import ExampleBounce from './ExampleBounce';
import ExampleBounceRaw from '!raw-loader!./ExampleBounce';
import ExampleTheme from './ExampleTheme';
import ExampleThemeRaw from '!raw-loader!./ExampleTheme';
import ExampleCustomContent from './ExampleCustomContent';
import ExampleCustomContentRaw from '!raw-loader!./ExampleCustomContent';
import ExampleMove from './ExampleMove';
import ExampleMoveRaw from '!raw-loader!./ExampleMove';

storiesOf('Core', module)
  .add('Tooltip', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <AutoDocs source={TooltipSource}/>

        <CodeExample title="Tooltip Placement" code={ExamplePlacementRaw}>
          <ExamplePlacement/>
        </CodeExample>

        <CodeExample title="Tooltip Bounce" code={ExampleBounceRaw}>
          <ExampleBounce/>
        </CodeExample>

        <CodeExample title="Tooltip Theme" code={ExampleThemeRaw}>
          <ExampleTheme/>
        </CodeExample>

        <CodeExample title="Tooltip Custom Content" code={ExampleCustomContentRaw}>
          <ExampleCustomContent/>
        </CodeExample>

        <CodeExample title="Custom tooltip adjustment" code={ExampleMoveRaw}>
          <ExampleMove/>
        </CodeExample>
      </div>

      <Markdown source={ReadmeTestKit}/>
    </TabbedView>
  ));
