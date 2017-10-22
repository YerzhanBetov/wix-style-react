# TextLink Testkits

> General TextLink for TPA

## TextLink TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| getTextContent | - | string | returns the link text |
| click | - | - | clicks on the link |
| exists (Only in Unit Test) | - | bool | fulfilled if element in the DOM |
| element (Only in E2E) | - | element | returns the driver element |

## Usage Example

> Unit Testing Example
```javascript
  import React from 'react';
  import {tpaTextLinkTestkitFactory as textLinkTestkitFactory} from '../../../testkit';
  import {tpaTextLinkTestkitFactory as enzymeTextLinkTestkitFactory} from '../../../testkit/enzyme';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<div><TextLink dataHook={dataHook}/></div>);
  const testkit = enzymeTextLinkTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div><TextLink dataHook={dataHook}/></div>, {dataHook})
  );
  const testkit = textLinkTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();
```


> E2E example
```javascript
  //Element should be rendered with a data-hook into the DOM
  <TextLink dataHook='myDataHook'/>

  /**********************
   Protractor example
  **********************/

  import {tpaTextLinkTestkitFactory, waitForVisibilityOf} from 'wix-style-react/dist/testkit/protractor';

  //Create an element testkit via the data-hook attribute
  const testkit = tpaTextLinkTestkitFactory({dataHook: 'myDataHook'});
  const expectedUrlAfterClick = 'https://www.link.is/pointing/here/';

  browser.get(appUrl);  //Your application url

  waitForVisibilityOf(driver.element(), 'Cannot find text link')
    .then(() => {
      driver.click();
      expect(browser.getCurrentUrl()).toBe(expectedUrlAfterClick);
    });
```
