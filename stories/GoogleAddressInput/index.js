import React from 'react';
import {storiesOf} from '@storybook/react';
import AutoDocs from '../utils/Components/AutoDocs';
import CodeExample from '../utils/Components/CodeExample';

import GoogleAddressInputSource from '!raw-loader!wix-style-react/GoogleAddressInput/GoogleAddressInput';
import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';
import ExampleControlledWithFooter from './ExampleControlledWithFooter';
import ExampleControlledWithFooterRaw from '!raw-loader!./ExampleControlledWithFooter';
import ExampleControlledWithGoogleFooter from './ExampleControlledWithGoogleFooter';
import ExampleControlledWithGoogleFooterRaw from '!raw-loader!./ExampleControlledWithGoogleFooter';

storiesOf('Core', module)
  .add('GoogleAddressInput', () => (
    <div>
      <AutoDocs source={GoogleAddressInputSource}/>

      <h1>Usage examples</h1>

      <CodeExample title="Controlled input" code={ExampleControlledRaw}>
        <ExampleControlled/>
      </CodeExample>

      <CodeExample title="Controlled input - with a footer" code={ExampleControlledWithFooterRaw}>
        <ExampleControlledWithFooter/>
      </CodeExample>

      <CodeExample title="Controlled input - with a google fixed footer" code={ExampleControlledWithGoogleFooterRaw}>
        <ExampleControlledWithGoogleFooter/>
      </CodeExample>
    </div>
  ));
