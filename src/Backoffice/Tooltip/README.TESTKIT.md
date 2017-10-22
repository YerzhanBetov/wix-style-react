# Tooltip component

> General tooltip and popover component.

## Tooltip TestKit API

### Polyfills

Tooltip driver might need polyfills, two polyfills are supported via the library
```javascript
import 'wix-style-react/dist/src/Backoffice/Tooltip/RangePolyfill.js';
import 'wix-style-react/dist/src/Backoffice/Tooltip/CancelAnimationPolyfill.js';
```

### Enzyme / ReactTestUtils
| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| isShown | - | boolean | true when to tooltip itself is visible |
| focus | - | - | focus on the tooltip element |
| blue | - | - | blur the tooltip element |
| click | - | - | click on the tooltip element |
| mouseEnter | - | - | simulate mouse enter the tooltip element |
| mouseLeave | - | - | simulate mouse leave the tooltip element |
| hasErrorTheme | - | boolean | true if the tooltip itself uses error theme | 
| hasDarkTheme | - | boolean | true if the tooltip itself uses dark theme | 
| hasLightTheme | - | boolean | true if the tooltip itself uses light theme | 
| getTooltipWrapper | - | element | return the wrapper that wraps the tooltip itself and the tooltip element | 
| getChildren | - | element | return the tooltip children | 
| getPlacement | - | string | return the tooltip placement | 
| getContent | - | element | return the tooltip content | 

## Usage Example

> Unit testing example

```javascript
  import React from 'react';
  import {backofficeTooltipTestkitFactory as tooltipTestkitFactory} from 'wix-style-react/dist/testkit';
  import {backofficeTooltipTestkitFactory as enzymeTooltipTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';
  import waitForCond from 'wait-for-cond';

  function waitFor(predicate, msg) {
    return waitForCond(predicate, 2000, msg);
  }

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<Tooltip dataHook={dataHook} {..._props}>{children}</Tooltip>);
  const testkit = enzymeTooltipTestkitFactory({wrapper, dataHook});

  //Do tests
  testkit.mouseEnter();
  expect(testkit.isShown()).toBeFalsy();
  return waitFor.assert(() => expect(testkit.isShown()).toBeTruthy());

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div><Tooltip dataHook={dataHook} {..._props}>{children}</Tooltip></div>)
  );
  const testkit = tooltipTestkitFactory({wrapper, dataHook});
  
  //Do tests
  testkit.mouseEnter();
  expect(testkit.isShown()).toBeFalsy();
  return waitFor.assert(() => expect(testkit.isShown()).toBeTruthy());
```
