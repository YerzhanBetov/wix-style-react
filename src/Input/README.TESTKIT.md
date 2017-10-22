# Input component

> General input container.

## Input TestKit API


### Enzyme / ReactTestUtils
| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| focus | - | - | focus the input |
| blur | - | - | blur the input |
| clickClear | - | - | when the clear button is visible, this will click it |
| clickSuffix | - | - | when suffix is visible, this will click it |
| enterText | string | - | applied text to the input |
| clearText | - | - | clears input |
| getValue | - | string | get the input text |
| getPlaceholder | - | string | get the placeholder text |
| getReadOnly | - | boolean | true if the input is read only |
| getAriaLabel | - | string | get the component aria-label |
| getAriaControls | - | string | get the component aria-controls |
| getAriaDescribedby | - | string | get the component aria-describedby |
| getAutocomplete | - | string | get the autocomplete attribute of the component |
| getType | - | string | get the input type |
| hasPrefix | - | boolean | true if the input have a prefix |
| hasSuffix | - | boolean | true if the input have a suffix |
| hasError | - | boolean | true if the input present an error |
| getUnit | - | string | get the input unit, if exists |
| hasMagnifyingGlass | - | boolean | true if input have magnifying glass, like search |
| hasMenuArrow | - | boolean | true if input have menu arrow, like dropdown |
| hasClearButton | - | boolean | true if the clear button is visible |
| isRTL | - | boolean | true if the input is in RTL mode |
| isFocusedStyle | - | boolean | true if the element is always focused |
| isHoveredStyle | - | boolean | true if the element is always hovered |
| isDisabled | - | boolean | true if the element is disabled |
| setProps | json | element | returns a clone of this element with the new props from the json |

### Protractor

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| element | - | element | returns the element |
| enterText | string | - | applied text to the input |
| getText | - | string | get the input text |
| hasClearButton | - | boolean | true if the clear button is visible |
| clickClear | - | - | when the clear button is visible, this will click it |

## Usage Example

> Unit testing example

```javascript
  import React from 'react';
  import {inputTestkitFactory} from 'wix-style-react/dist/testkit';
  import {inputTestkitFactory as enzymeInputTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<div/><Input value="my text value" dataHook={dataHook}/></div>);
  const testkit = enzymeInputTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.getValue()).toBe('my text value');

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div/><Input value="my text value" dataHook={dataHook}/></div>, {dataHook})
  );
  const testkit = inputTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.getValue()).toBe('my text value');
```
> E2E example

```javascript
  //Element should be rendered with a data-hook into the DOM
  <Input dataHook='myDataHook'/>

  /*******************
   protractor example
  *******************/

  import {inputTestkitFactory, waitForVisibilityOf} from 'wix-style-react/dist/testkit/protractor';

  //Create an element testkit via the data-hook attribute
  const testkit = inputTestkitFactory({dataHook: 'myDataHook'});

  browser.get(appUrl); //Your application url

  waitForVisibilityOf(testkit.element(), 'Cannot find Input')
     .then(() => {
        //Do tests
        expect(testkit.element().isDisplayed()).toBeTruthy();
     });
```
