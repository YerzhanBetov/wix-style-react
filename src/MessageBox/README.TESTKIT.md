# MessageBox testkits

> MessageBoxFunctionalLayout

## MessageBoxFunctionalLayout TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| exists | - | bool | fulfilled if element in the DOM |
| getConfirmationButton | - | element | returns the confirmation button element |
| getConfirmationButtonText | - | string | returns the confirmation button text |
| getCancellationButton | - | element | returns the cancellation button element |
| getCancellationButtonText | - | string | returns the cancellation button text |
| getHeaderCloseButton | - | element | returns the close button element |
| isCancelEnable | - | boolean | Whether cancel button is enabled    |
| isConfirmationEnable | - | boolean | Whether confirmation button is enabled |
| clickOnCancellationButton | - | - | clicks on the cancellation button |
| clickOnConfirmationButton | - | - | clicks on the confirmation button |
| clickOnHeaderCloseButton | - | - | clicks on the close button |
| isThemeExist | (green, blue , red) | bool | fulfilled if theme applied |
| getFooter | - | element | returns the footer element |
| getTitle | - | string | returns the  title of the Message Box |
| getChildBySelector | selector | child element | return the element inside the Message box content |

## Usage Example

```javascript
  import React from 'react';
  import {messageBoxFunctionalLayoutTestkitFactory} from 'wix-style-react/dist/testkit';
  import {messageBoxFunctionalLayoutTestkitFactory as enzymeMessageBoxFunctionalLayoutTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';
  
  /**************
   enzyme exmaple
  ***************/
  
  const component = mount(<div/><MessageBoxFunctionalLayout dataHook='messageBox'/></div>);
  enzymeMessageBoxFunctionalLayoutTestKit = enzymeMessageBoxFunctionalLayoutTestkitFactory({wrapper: component, dataHook: 'messageBox'})
  
  expect(enzymeMessageBoxFunctionalLayoutTestKit.getConfirmationButtonText()).toBe('OK');

  /***********************
   ReactTestUtils exmaple
  ***********************/
  
  const div = document.createElement('div');
  const dataHook = 'messageBox';
  const elementToRender = React.cloneElement(Element, {dataHook});
  const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div>{elementToRender}</div>));
  const testkit = messageBoxFunctionalLayoutTestkitFactory({wrapper, dataHook});
  
  expect(messageBoxFunctionalLayoutTestKit.getConfirmationButtonText()).toBe('OK');
```

> MessageBoxMarketerialLayout

## MessageBoxMarketerialLayout TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| exists | - | bool | fulfilled if element in the DOM |
| getPrimaryButton | - | element | returns the primary button element |
| getPrimaryButtonText | - | string | returns the primary button text |
| getSecondaryButton | - | element | returns the secondary button element |
| getSecondaryButtonText | - | string | returns the secondary button text |
| clickOnPrimaryButton | - | - | clicks on the primary button |
| clickOnSecondaryButton | - | - | clicks on the secondary button |
| closeMessageBox | - | - | closes the message box |
| getTitle | - | string | returns the title of the Message Box |
| getImageSrc | - | string | returns the image src string url of Message Box image |
| getContentBySelector | selector | content element | return the content element inside the Message box |

## Usage Example

```javascript
  import React from 'react';
  import {messageBoxMarketerialLayoutTestkitFactory} from 'wix-style-react/dist/testkit';
  import {messageBoxMarketerialLayoutTestkitFactory as enzymeMessageBoxMarketerialLayoutTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';
  
  /**************
   enzyme exmaple
  ***************/
  
  const component = mount(<div/><MessageBoxMarketerialLayout dataHook='messageBox'/></div>);
  enzymeMessageBoxMarketerialLayoutTestKit = enzymeMessageBoxMarketerialLayoutTestkitFactory({wrapper: this.component, dataHook: 'messageBox'})
  
  expect(enzymeMessageBoxMarketerialLayoutTestKit.getPrimaryButtonText()).toBe('OK');
  
  /***********************
   ReactTestUtils exmaple
  ***********************/
  
  const div = document.createElement('div');
  const dataHook = 'messageBox';
  const elementToRender = React.cloneElement(Element, {dataHook});
  const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div>{elementToRender}</div>));
  const testkit = messageBoxMarketerialLayoutTestkitFactory({wrapper, dataHook});
  
  expect(messageBoxMarketerialLayoutTestKit.getPrimaryButtonText()).toBe('OK');
```
