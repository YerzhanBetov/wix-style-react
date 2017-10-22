# MultiSelect component

> General input container.

## MultiSelect TestKit API

### Exposed Drivers
The `<MultiSelect/>` TestKit is exposing the following drivers:
* Its own driver (see examples below).
* [inputDriver](https://wix.github.io/wix-style-react/?selectedKind=Core&selectedStory=Input&full=0&down=0&left=1&panelRight=0)
* [dropdownLayoutDriver](https://wix.github.io/wix-style-react/?selectedKind=Core&selectedStory=DropdownLayout&full=0&down=0&left=1&panelRight=0)
* [tagDriver](https://wix.github.io/wix-style-react/?selectedKind=Core&selectedStory=Tag&full=0&down=0&left=1&panelRight=0) using the `getTagDriverByTagId(id)` function


### Enzyme / ReactTestUtils
| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| clickOnInputWrapper | - | - | click on the input element wrapper |
| inputWrapperHasFocus | - | boolean | returns is the input is focused |
| numberOfTags | - | number | returns the number of tags selected in the input |
| getTagLabelAt | index | string | returns the label of the tag given it's index |
| pressCommaKey | - | - | press the comma key in the input field |
| getTagDriverByTagId | tagId | object | returns the `tagDriver` for the specified tag id |
| setProps | json | element | returns a clone of this element with the new props from the json |
| getMaxHeight | - | string | returns the max height of the component |

## Usage Example

> Unit testing example

```javascript
  import React from 'react';
  import {multiSelectTestkitFactory} from 'wix-style-react/dist/testkit';
  import {multiSelectTestkitFactory as enzymeMultiSelectTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const tags = [{value: 'Alabama', id: 'Alabama'}];
  const wrapper = mount(<MultiSelect tags={tags} autoFocus={true} dataHook={dataHook}/>);
  const multiSelectTestkit = enzymeMultiSelectTestkitFactory({wrapper, dataHook});


  //Do tests
  expect(multiSelectTestkit.driver.exists()).toBeTruthy();
  expect(multiSelectTestkit.inputDriver.exists()).toBeTruthy();
  expect(multiSelectTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
  expect(multiSelectTestkit.driver.getTagDriverByTagId('Alabama').exists()).toBeTruthy();
```
