# Button Testkits

> General Buttons for TPA

## Button TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| getButtonTextContent | - | string | returns the button text |
| isButtonDisabled | - | bool | fulfilled if button disabled |
| click | - | - | clicks on the button |
| exists (Only in Unit Test) | - | bool | fulfilled if element in the DOM |
| element (Only in E2E) | - | element | returns the driver element |

## Usage Example

> Unit Testing Example
```javascript
  import React from 'react';
  import {tpaButtonTestkitFactory} from 'wix-style-react/dist/testkit';
  import {tpaButtonTestkitFactory as enzymeTpaButtonTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<div><Button dataHook={dataHook}/></div>);
  const testkit = enzymeTpaButtonTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div><Button dataHook={dataHook}/></div>, {dataHook})
  );
  const testkit = tpaButtonTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();
```


> E2E example
```javascript
  //Element should be rendered with a data-hook into the DOM
  <Button dataHook='myDataHook'/>

  /**********************
   Protractor example
  **********************/

  import {tpaButtonTestkitFactory, waitForVisibilityOf} from 'wix-style-react/dist/testkit/protractor';

  //Create an element testkit via the data-hook attribute
  const testkit = tpaButtonTestkitFactory({dataHook: 'myDataHook'});

  browser.get(appUrl);  //Your application url

  waitForVisibilityOf(testkit.element(), 'Cannot find Button')
     .then(() => {
       //Do tests
        expect(testkit.element().isDisplayed()).toBeTruthy();
     });
```
