# LanguagePicker component

> Dropdown Language Picker

## LanguagePicker TestKit API

### The LanguagePicker TestKit is exposing the [IconWithOptions](https://wix.github.io/wix-style-react/?selectedKind=4.%20Selection&selectedStory=4.5%20IconWithOptions&full=0&down=0&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel)

## Usage Example

> Unit Testing Example
```javascript
  import React from 'react';
  import {LanguagePickerTestkitFactory} from 'wix-style-react/dist/testkit';
  import {LanguagePickerTestkitFactory as enzymeLanguagePickerTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<LanguagePicker dataHook={dataHook}/>);
  const LanguagePickerTestkit = enzymeLanguagePickerTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(LanguagePickerTestkit.driver.exists()).toBeTruthy();
  expect(LanguagePickerTestkit.dropdownLayoutDriver.exists()).toBeTruthy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><LanguagePicker dataHook={dataHook}/></div>));
  const LanguagePickerTestkit = LanguagePickerTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(LanguagePickerTestkit.driver.exists()).toBeTruthy();
  expect(LanguagePickerTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
```
