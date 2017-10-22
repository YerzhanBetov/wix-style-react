# Modal component

> General modal container.

## Modal TestKit API


### Enzyme / ReactTestUtils
| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| isOpen | - | boolean | true when to module is open |

## Usage Example

> Unit testing example

```javascript
  import React from 'react';
  import {modalSelectorTestkitFactory} from 'wix-style-react/dist/testkit';
  import {modalSelectorTestkitFactory as enzymeModalSelectorTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<div/><ModalSelector {...props} dataHook={dataHook}/></div>);
  const testkit = enzymeModalSelectorTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.isOpen()).toBeFalsy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div/><ModalSelector {...props} dataHook={dataHook}/></div>, {dataHook})
  );
  const testkit = modalSelectorTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();
```
