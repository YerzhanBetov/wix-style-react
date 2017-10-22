# DatePicker TestKits

When testing DatePicker you might see some errors with unknown functions, to fix it -

```js
import datePickerPolyfills from 'wix-style-react/dist/src/DatePicker/Polyfills';
```

Before the tests and after each jsdom cleanup -
```js
datePickerPolyfills(window, global);
```

## DatePicker TestKit API

## Unit testing

### driver

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| exists | - | bool | checks if element does exist |

### inputDriver

[See Input component driver documentation](https://wix.github.io/wix-style-react/?selectedKind=Core&selectedStory=Input).

### calendarDriver

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| isVisible | - | bool | checks if calendar is visible |
| clickOnNthDay | number | - | select Nth available day |
| clickOnYearDropdown | - | - | open year dropdown options list |
| clickOnNthYear | number | - | select Nth year (should start with 1 because of additional control arrows) |
| clickOnPrevMonthButton | - | - | clicks on previous month button |
| clickOnNextMonthButton | - | - | clicks on next month button |

### Usage Example

> Unit testing example

```javascript
  import React from 'react';
  import {DatePickerTestkitFactory} from 'wix-style-react/dist/testkit';
  import {DatePickerTestkitFactory as enzymeDatePickerTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<div/><DatePicker dataHook={dataHook}/></div>);
  const {driver} = enzymeDatePickerTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(driver.exists()).toBeTruthy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div/><DatePicker dataHook={dataHook}/></div>, {dataHook})
  );
  const testkit = DatePickerTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.driver.exists()).toBeTruthy();
```

## E2E testing

### input

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| exists | - | bool | checks if element is present in DOM |
| isDisplayed | - | bool | check if input is visible |
| click | - | - | clicks on input |
| pressEnterKey | - | - | press "Enter" key on input |
| pressEscKey | - | - | press "Escape" key on input |
| pressTabKey | - | - | press "Tab" key on input |

### calendar

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| exists | - | bool | checks if element is present in DOM |
| isDisplayed | - | bool | check if calendar is visible |
| clickOnNthAvailableDay | number | - | click on Nth available date for current month|
| openYearDropdownOptions | - | - | open year options dropdown |
| clickOnNthYear | number | - | click on Nth year from year options dropdown |
| openMonthDropdownOptions | - | - | open month options dropdown |
| clickOnNthMonth | number | - | click on Nth month from month options dropdown |

### Usage Example

> E2E example

```javascript
  //Element should be rendered with a data-hook into the DOM
  <DatePicker dataHook='myDataHook'/>

  /*******************
   protractor example
  *******************/

  import {DatePickerTestkitFactory, waitForVisibilityOf} from 'wix-style-react/dist/testkit/protractor';

  //Create an element testkit via the data-hook attribute
  const testkit = DatePickerTestkitFactory({dataHook: 'myDataHook'});

  browser.get(appUrl); //Your application url

  waitForVisibilityOf(testkit.element(), 'Cannot find DatePicker')
     .then(() => {
        //Do tests
        expect(testkit.element().isDisplayed()).toBeTruthy();
     });

```
