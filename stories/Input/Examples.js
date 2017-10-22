import React from 'react';
import PropTypes from 'prop-types';

import CodeExample from '../utils/Components/CodeExample';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleError from './ExampleError';
import ExampleErrorRaw from '!raw-loader!./ExampleError';

import ExampleUnit from './ExampleUnit';
import ExampleUnitRaw from '!raw-loader!./ExampleUnit';

import ExampleMagnifyingGlass from './ExampleMagnifyingGlass';
import ExampleMagnifyingGlassRaw from '!raw-loader!./ExampleMagnifyingGlass';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

import ExampleClearButton from './ExampleClearButton';
import ExampleClearButtonRaw from '!raw-loader!./ExampleClearButton';

import ExampleRefs from './ExampleRefs';
import ExampleRefsRaw from '!raw-loader!./ExampleRefs';

import ExampleSizes from './ExampleSizes';
import ExampleSizesRaw from '!raw-loader!./ExampleSizes';

import ExampleRoundInput from './ExampleRoundInput';
import ExampleRoundInputRaw from '!raw-loader!./ExampleRoundInput';

const Examples = ({theme}) =>
  <div>
    <CodeExample title="Standard" code={ExampleStandardRaw}>
      <ExampleStandard theme={theme}/>
    </CodeExample>

    <CodeExample title="Error" code={ExampleErrorRaw}>
      <ExampleError theme={theme}/>
    </CodeExample>

    <CodeExample title="Unit" code={ExampleUnitRaw}>
      <ExampleUnit theme={theme}/>
    </CodeExample>

    <CodeExample title="MagnifyingGlass" code={ExampleMagnifyingGlassRaw}>
      <ExampleMagnifyingGlass theme={theme}/>
    </CodeExample>

    <CodeExample title="Clear button" code={ExampleClearButtonRaw}>
      <ExampleClearButton theme={theme}/>
    </CodeExample>

    <CodeExample title="Controlled input" code={ExampleControlledRaw}>
      <ExampleControlled theme={theme}/>
    </CodeExample>

    <CodeExample title="Sizes" code={ExampleSizesRaw}>
      <ExampleSizes theme={theme}/>
    </CodeExample>

    <CodeExample title="Rounded input" code={ExampleRoundInputRaw}>
      <ExampleRoundInput theme={theme}/>
    </CodeExample>

    <CodeExample title="Commands test" code={ExampleRefsRaw}>
      <ExampleRefs theme={theme}/>
    </CodeExample>
  </div>;

Examples.propTypes = {
  theme: PropTypes.string
};

export default Examples;
