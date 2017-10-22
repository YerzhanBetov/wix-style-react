import React from 'react';
import {storiesOf} from '@storybook/react';
import CodeExample from '../utils/Components/CodeExample';
import Markdown from '../utils/Components/Markdown';

import ExampleGridStandard from './ExampleGridStandard';
import ExampleGridStandardRaw from '!raw-loader!./ExampleGridStandard';

import ExampleRowWithEqualHeight from './ExampleRowWithEqualHeight';
import ExampleRowWithEqualHeightRaw from '!raw-loader!./ExampleRowWithEqualHeight';

import ExampleCollapseableHeaders from './ExampleGridCollapsableHeaders';
import ExampleCollapseableHeadersRaw from '!raw-loader!./ExampleGridCollapsableHeaders';

import ExampleGridRTL from './ExampleGridRTL';
import ExampleGridRTLRaw from '!raw-loader!./ExampleGridRTL';

import ExampleAutoAdjustedRow from './ExampleAutoAdjustedRow';
import ExampleAutoAdjustedRowRaw from '!raw-loader!./ExampleAutoAdjustedRow';

import ExampleGridActionHeaders from './ExampleGridActionHeaders';
import ExampleGridActionHeadersRaw from '!raw-loader!./ExampleGridActionHeaders';

import ExampleGridAnimation from './ExampleGridAnimation';
import ExampleGridAnimationRaw from '!raw-loader!./ExampleGridAnimation';

import Readme from '../../src/Grid/README.md';

storiesOf('Common', module)
  .add('Grid with card layout', () => (
    <div>
      <Markdown source={Readme}/>

      <CodeExample title="Grid with animations" code={ExampleGridAnimationRaw}>
        <ExampleGridAnimation/>
      </CodeExample>

      <CodeExample title="Grid with card layout" code={ExampleGridStandardRaw}>
        <ExampleGridStandard/>
      </CodeExample>

      <CodeExample title="Cards with action headers" code={ExampleGridActionHeadersRaw}>
        <ExampleGridActionHeaders/>
      </CodeExample>

      <CodeExample title="Grid with equal height row" code={ExampleRowWithEqualHeightRaw}>
        <ExampleRowWithEqualHeight/>
      </CodeExample>

      <CodeExample title="Grid with auto adjusted row" code={ExampleAutoAdjustedRowRaw}>
        <ExampleAutoAdjustedRow/>
      </CodeExample>

      <CodeExample title="Grid with card RTL" code={ExampleGridRTLRaw}>
        <ExampleGridRTL/>
      </CodeExample>

      <CodeExample title="Cards with collpased header" code={ExampleCollapseableHeadersRaw}>
        <ExampleCollapseableHeaders/>
      </CodeExample>
    </div>
  ));
