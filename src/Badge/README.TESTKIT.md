# Badge Testkits

> General Badge

## Enzyme/ReactTestUtils TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| isOfType | string | boolean | true if this type appears in the element styles |
| isOfAppearance | string | boolean | true if this appearance appears in the element styles  |
| isOfAlignment | - | bool | true if this type alignment in the element styles |
| isOfShape | string | boolean | true if this shape is in the element styles |
| isBadge | - | bool | true if the component is a badge (has the .badge in the element styles) |
| text | - | string | get the badge text |
| exists | - | bool | fulfilled if element in the DOM |

## Protractor TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| isOfType | string | boolean | true if this type appears in the element styles |
| isOfAppearance | string | boolean | true if this appearance appears in the element styles  |
| isOfAlignment | - | bool | true if this type alignment in the element styles |
| isOfShape | string | boolean | true if this shape is in the element styles |
| isBadge | - | bool | true if the component is a badge (has the .badge in the element styles) |
| text | - | string | get the badge text |
| element | - | element | get the actual element |

## Usage Example

> Unit Testing Example
```javascript
  import React from 'react';
  import {badgeTestkitFactory} from 'wix-style-react/dist/testkit';
  import {badgeTestkitFactory as enzymeBadgeTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<div/><Badge dataHook={dataHook}/></div>);
  const testkit = enzymeBadgeTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div/><Badge dataHook={dataHook}/></div>, {dataHook})
  );
  const testkit = badgeTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();
```


> E2E example
```javascript
  //Element should be rendered with a data-hook into the DOM
  <Badge dataHook='myDataHook'/>

  /**********************
   Protractor example
  **********************/

  import {badgeTestkitFactory, waitForVisibilityOf} from 'wix-style-react/dist/testkit/protractor';

  //Create an element testkit via the data-hook attribute
  const testkit = badgeTestkitFactory({dataHook: 'myDataHook'});

  browser.get(appUrl);  //Your application url

  waitForVisibilityOf(testkit.element(), 'Cannot find Badge')
     .then(() => {
       //Do tests
        expect(testkit.element().isDisplayed()).toBeTruthy();
     });
```
