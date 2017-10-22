# DropdownLayout component

> layout to pop options

## DropdownLayout TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| isShown | - | boolean | true if the element is visible |
| isDown | - | boolean | true if the element open direction is down |
| isUp | - | boolean | true if the element open direction is up |
| optionsLength | - | number | return the number of options in this element |
| mouseEnterAtOption | number | - | simulate mouse enter at option index <number> |
| mouseLeaveAtOption | number | - | simulate mouse leave from option index <number> |
| mouseClickOutside | - | - | simulate mouse click outside the element |
| isOptionExists | string | boolean | true if an option with the argument content is exists |
| isOptionHovered | number | boolean | true if option index <number> exists |
| isOptionSelected | number | boolean | true if option index <number> selected |
| pressDownKey | - | - | simulate down key press |
| pressUpKey | - | - | simulate up key press |
| pressEnterKey | - | - | simulate enter key press |
| pressTabKey | - | - | simulate tab key press |
| pressEscKey | - | - | simulate esc key press |
| optionContentAt | number | string | get the content of the option at index <number> |
| clickAtOption | number | - | simulate click on option at index <number> |
| clickAtOptionWithValue | string | - | press esc key on the input element |
| isOptionADivider | number | boolean | true if option at index <number> is a divider |
| isOptionHeightSmall | number | boolean | true if option at index <number> has small height |
| isOptionHeightBig | number | boolean | true if option at index <number> has big height |
| isLinkOption | number | boolean | true if option is a link |
| mouseEnter | - | - | simulate mouseEnter dropdown wrapper |
| mouseLeave | - | - | simulate mouseLeave dropdown wrapper |
| setProps | json | element | returns a clone of this element with the new props from the json | 

## Usage Example

> Unit Testing Example
```javascript
  import React from 'react';
  import {dropdownLayoutTestkitFactory} from 'wix-style-react/dist/testkit';
  import {dropdownLayoutTestkitFactory as enzymeDropdownLayoutTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/
  
  const dataHook = 'myDataHook';
  const wrapper = mount(<DropdownLayout {...props} dataHook={dataHook}/>);
  const dropdownLayoutTestkit = enzymeDropdownLayoutTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(dropdownLayoutTestkit.isUp()).toBeTruthy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><DropdownLayout {...props} dataHook={dataHook}/></div>));
  const dropdownLayoutTestkit = dropdownLayoutTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(dropdownLayoutTestkit.isUp()).toBeTruthy();
```