# Selector component

> General modal container.

## Selector TestKit API


### Enzyme / ReactTestUtils
| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| title | - | string | title |

## Usage Example

> Unit testing example

```javascript
  import React from 'react';
  import {selectorTestkitFactory} from 'wix-style-react/dist/testkit';
  import {selectorTestkitFactory as enzymeSelectorTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<div/><Selector {...props} dataHook={dataHook}/></div>);
  const testkit = enzymeSelectorTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.isOpen()).toBeFalsy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div/><Selector {...props} dataHook={dataHook}/></div>, {dataHook})
  );
  const testkit = selectorTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();
```
