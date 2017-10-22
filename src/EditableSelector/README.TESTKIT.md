# EditableSelector Testkits

> General Badge

## Enzyme/ReactTestUtils TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| title | - | string | get the title |
| items | - | [Selector.driver] | get all items |
| newRowButton | - | element | get the new row button |
| deleteButtonAt | int | element | get the delete button for item at index |
| getEditButtonAt | int | element | get the edit button for item at index  |
| isEditing | - | bool | true if edit row is active |
| clickApprove | - | - | trigger a click on edit row approve button |
| clickCancel | - | - | trigger a click on edit row cancel button |
| toggleItem | int | - | toggle the selected state of item at index |
| addNewRow | string | - | add a new item with label |
| editRow | int,string | - | edit an items label at index |
| deleteRow | int | - | delete an items at index |
| setProps | object |  | set props on element |
| exists | - | bool | fulfilled if element in the DOM |

## Protractor TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| title | - | string | get the title |
| item | int | element | get item at index |
| items  | [element] | get all item |
| isSelected | int | bool | true if item is selected |
| clickApprove | - | - | trigger a click on edit row approve button |
| clickCancel | - | - | trigger a click on edit row cancel button |
| toggleItem | int | - | trigger a click on the item at index |
| createNewRow | string | - | enter edit mode |
| editRow | int,string | - | edit an items label at index |
| deleteRow | int | - | delete an items at index |
| element | - | element | get the actual element |

## Usage Example

> Unit Testing Example
```javascript
  import React from 'react';
  import {editableSelectorTestkitFactory} from 'wix-style-react/dist/testkit';
  import {editableSelectorTestkitFactory as enzymeEditableSelectorTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<div/><EditableSelector dataHook={dataHook}/></div>);
  const testkit = enzymeEditableSelectorTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div/><EditableSelector dataHook={dataHook}/></div>, {dataHook})
  );
  const testkit = editableSelectorTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();
```


> E2E example
```javascript
  //Element should be rendered with a data-hook into the DOM
  <EditableSelector dataHook='myDataHook'/>

  /**********************
   Protractor example
  **********************/

  import {editableSelectorTestkitFactory, waitForVisibilityOf} from 'wix-style-react/dist/testkit/protractor';

  //Create an element testkit via the data-hook attribute
  const testkit = editableSelectorTestkitFactory({dataHook: 'myDataHook'});

  browser.get(appUrl);  //Your application url

  waitForVisibilityOf(testkit.element(), 'Cannot find EditableSelector')
     .then(() => {
       //Do tests
        expect(testkit.element().isDisplayed()).toBeTruthy();
     });
```
