import React from 'react';
import {storiesOf} from '@storybook/react';
import AutoDocs from '../utils/Components/AutoDocs';
import CodeExample from '../utils/Components/CodeExample';
import TimeInputSource from '!raw-loader!wix-style-react/TimeInput/TimeInput';

import ExampleUncontrolled from './ExampleUncontrolled';
import ExampleUncontrolledRaw from '!raw-loader!./ExampleUncontrolled';
import ExampleUncontrolled24h from './ExampleUncontrolled24h';
import ExampleUncontrolledRaw24h from '!raw-loader!./ExampleUncontrolled24h';
import ExampleDisabled from './ExampleDisabled';
import ExampleDisabledRaw from '!raw-loader!./ExampleDisabled';
import moment from 'moment';

storiesOf('Core', module)
  .add('TimeInput', () => (
    <div>
      <AutoDocs source={TimeInputSource}/>

      <h1>Usage examples</h1>

      <CodeExample title="Uncontrolled input" code={ExampleUncontrolledRaw}>
        <ExampleUncontrolled startTime={moment('2016-04-03 13:42')}/>
      </CodeExample>

      <CodeExample title="Uncontrolled input 24h" code={ExampleUncontrolledRaw24h}>
        <ExampleUncontrolled24h startTime={moment('2016-04-03 13:42')}/>
      </CodeExample>

      <CodeExample title="Disabled input" code={ExampleDisabledRaw}>
        <ExampleDisabled startTime={moment('2016-04-03 13:42')}/>
      </CodeExample>
    </div>
  ));
