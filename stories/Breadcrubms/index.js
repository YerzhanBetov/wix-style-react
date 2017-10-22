import React from 'react';
import {storiesOf} from '@storybook/react';
import CodeExample from '../utils/Components/CodeExample';
import Markdown from '../utils/Components/Markdown';
import AutoDocs from '../utils/Components/AutoDocs';
import TabbedView from '../utils/Components/TabbedView';

import Readme from '../../src/Breadcrumbs/README.md';
import BreadcrumbsSource from '!raw-loader!../../src/Breadcrumbs/Breadcrumbs';
import ReadmeTestKit from '../../src/Breadcrumbs/README.TESTKIT.md';

import ExampleStandardRow from '!raw-loader!../Breadcrubms/ExampleStandard';
import ExampleStandard from '../Breadcrubms/ExampleStandard';

import ExampleSizesRow from '!raw-loader!../Breadcrubms/ExampleSizes';
import ExampleSizes from '../Breadcrubms/ExampleSizes';

import ExampleThemesRow from '!raw-loader!../Breadcrubms/ExampleThemes';
import ExampleThemes from '../Breadcrubms/ExampleThemes';

import ExampleWithNodesRow from '!raw-loader!../Breadcrubms/ExampleWithNodes';
import ExampleWithNodes from '../Breadcrubms/ExampleWithNodes';

import ExampleWithOnClickRow from '!raw-loader!../Breadcrubms/ExampleWithOnClick';
import ExampleWithOnClick from '../Breadcrubms/ExampleWithOnClick';

import ExampleWithChosenActiveElementRaw from '!raw-loader!../Breadcrubms/ExampleWithChosenActiveElement';
import ExampleWithChosenActiveElement from '../Breadcrubms/ExampleWithChosenActiveElement';

import ExampleUsingURLRaw from '!raw-loader!../Breadcrubms/ExampleUsingURL';
import ExampleUsingURL from '../Breadcrubms/ExampleUsingURL';

storiesOf('Core', module)
  .add('Breadcrumbs', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <AutoDocs source={BreadcrumbsSource}/>

        <Markdown source={Readme}/>

        <CodeExample title="Standard" code={ExampleStandardRow}>
          <ExampleStandard/>
        </CodeExample>

        <CodeExample title="Sizes" code={ExampleSizesRow}>
          <ExampleSizes/>
        </CodeExample>

        <CodeExample title="Example using path factory" code={ExampleUsingURLRaw}>
          <ExampleUsingURL/>
        </CodeExample>

        <CodeExample title="Themes" code={ExampleThemesRow}>
          <ExampleThemes/>
        </CodeExample>

        <CodeExample title="Html node items" code={ExampleWithNodesRow}>
          <ExampleWithNodes/>
        </CodeExample>

        <CodeExample title="On click callback" code={ExampleWithOnClickRow}>
          <ExampleWithOnClick/>
        </CodeExample>

        <CodeExample title="Chosen active element" code={ExampleWithChosenActiveElementRaw}>
          <ExampleWithChosenActiveElement/>
        </CodeExample>
      </div>

      <Markdown source={ReadmeTestKit}/>
    </TabbedView>
  ));
