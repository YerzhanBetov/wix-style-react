# Breadcrumbs Testkits

## TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| breadcrumbContentAt | position | string | return the breadcrumb item content at position |
| breadcrumbLength | - | number | return the number of the items in the breadcrumbs |
| clickBreadcrumbAt | position | string | click on breadcrumb item at position |
| getActiveItemId | position(or null if no active item exists) | string | return the active breadcrumb item position or return null if no active item exists |
| getLabelClassList | - | arrayOf(string) | returns breadcrumbs component classes |
| isLarge | - | bool | fulfilled if breadcrumbs component is large |
| isMedium | - | bool | fulfilled if breadcrumbs component is medium |
| isOnWhiteBackground | - | bool | fulfilled if breadcrumbs component is on white background |
| isOnGrayBackground | - | bool | fulfilled if breadcrumbs component is on gray background |
| exists (Only in Unit Test) | - | bool | fulfilled if element in the DOM |
| element (Only in E2E) | - | element | returns the driver element |
| isActiveLinkAt | position | bool | returns true if the item is a link |

## Usage Example

> Unit Testing Example
```javascript
  import React from 'react';
  import {breadcrumbsTestkitFactory} from 'wix-style-react/dist/testkit';
  import {breadcrumbsTestkitFactory as enzymeBreadcrumbsTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<div/><Breadcrumbs dataHook={dataHook}/></div>);
  const testkit = enzymeBreadcrumbsTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div/><Breadcrumbs dataHook={dataHook}/></div>, {dataHook})
  );
  const testkit = BreadcrumbsTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();
```


> E2E example
```javascript
  //Element should be rendered with a data-hook into the DOM
  <Breadcrumbs dataHook='myDataHook'/>

  /**********************
   Protractor example
  **********************/

  import {breadcrumbsTestkitFactory, waitForVisibilityOf} from 'wix-style-react/dist/testkit/protractor';

  //Create an element testkit via the data-hook attribute
  const testkit = BreadcrumbsTestkitFactory({dataHook: 'myDataHook'});

  browser.get(appUrl);  //Your application url

  waitForVisibilityOf(testkit.element(), 'Cannot find Breadcrumbs')
     .then(() => {
       //Do tests
        expect(testkit.element().isDisplayed()).toBeTruthy();
     });
```
