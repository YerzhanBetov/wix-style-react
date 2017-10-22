# ButtonWithOptions component

> Button with dropdownLayout

## ButtonWithOptions TestKit API

### The ButtonWithOptions TestKit is exposing the [buttonDriver](https://wix.github.io/wix-style-react/?selectedKind=Core&selectedStory=Button&full=0&down=0&left=1&panelRight=0) and [dropdownLayoutDriver](https://wix.github.io/wix-style-react/?selectedKind=Core&selectedStory=DropdownLayout&full=0&down=0&left=1&panelRight=0) and adds its own driver, see examples below
 
#### Driver methods:

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| click | - | - | click the button element |
| pressDownKey | - | - | press down key on the button element |
| pressUpKey | - | - | press up key on the button element |
| pressAnyKey | - | - | press any key on the button element |
| pressEnterKey | - | - | press enter key on the button element |
| pressTabKey | - | - | press tab key on the button element |
| pressEscKey | - | - | press esc key on the button element |
| setProps | json | element | returns a clone of this element with the new props from the json | 

## Usage Example

> Unit Testing Example
```javascript
  import React from 'react';
  import {ButtonWithOptionsTestkitFactory} from 'wix-style-react/dist/testkit';
  import {ButtonWithOptionsTestkitFactory as enzymeButtonWithOptionsTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/
  
  const dataHook = 'myDataHook';
  const wrapper = mount(<ButtonWithOptions dataHook={dataHook}/>);
  const ButtonWithOptionsTestkit = enzymeButtonWithOptionsTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(ButtonWithOptionsTestkit.driver.exists()).toBeTruthy();
  expect(ButtonWithOptionsTestkit.buttonDriver.exists()).toBeTruthy();
  expect(ButtonWithOptionsTestkit.dropdownLayoutDriver.exists()).toBeTruthy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><ButtonWithOptions dataHook={dataHook}/></div>));
  const ButtonWithOptionsTestkit = ButtonWithOptionsTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(ButtonWithOptionsTestkit.driver.exists()).toBeTruthy();
  expect(ButtonWithOptionsTestkit.buttonDriver.exists()).toBeTruthy();
  expect(ButtonWithOptionsTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
```