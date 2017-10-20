# Testing

> For component library to be stable, it must be testable and tested.

We use [jest](https://facebook.github.io/jest/) for unit and [protractor](http://www.protractortest.org/#/) for e2e tests.

## Unit Tests

`npm run test:unit`

During `npm start`, unit tests will run automatically on each file change.
Make use of `jest`'s interactive mode, for example, press `p` in your command line and type the name of the test.

![image](./ASSETS/JEST_INTERACTIVE.png)

## E2E Tests

`npm run test:e2e`

while developing it's useful to `npm start`, work as usual and then `npm run e2e-only` to start protractor.

We use [`eyes.it`](https://github.com/wix/eyes.it). TL;DR; use `eyes.it` instead of just `it`. `eyes.fit` to focus a single test.

Use `browser.pause()` or `browser.explore()` to debug e2e tests. Refer to [protractor docs](http://www.protractortest.org/#/api?view=ProtractorBrowser) for more details.


# TestKits

> For component library to be testable, it must provide testkits.

`wix-style-react` comes with components testkits.  Each component has a `<componentName>TestkitFactory` method which exposes api relevant to component.
It will receive a wrapper (for now we only support Enzyme wrapper) and component `dataHook` as an input, and returns an object which contains all API methods.

## Example

Using wix style Button in your production code:

```js
<myForm>
  ...
  <Button dataHook="my-button" />
  ...
</myForm>
```

Inside your test:

```js
import ReactTestUtils from 'react-dom/test-utils';
import {buttonTestkitFactory} from 'wix-style-react/dist/testkit';

const myFormWrapper = ReactTestUtils.renderIntoDocument(<myForm...>);

//Initialize the testkit:
const buttonTestkit = buttonTestkitFactory({wrapper: myFormWrapper, dataHook: 'my-button'});//testkit factory should receive a DOM element wrapper and an dataHook and expose an api for it

//Use the testkit
buttonTestkit.click();
```

If you are using Enzyme:

```js
import {mount} from 'enzyme';
import {buttonTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

const myFormWrapper = mount(<myForm...>);

//Initialize the testkit:
const buttonTestkit = buttonTestkitFactory({wrapper: myFormWrapper, dataHook: 'my-button'});//testkit factory should receive an Enzyme wrapper and an dataHook and expose an api for it

//Use the testkit
buttonTestkit.click();
```


If you are using Protractor:

```js
import {buttonTestkitFactory, waitForVisibilityOf} from 'wix-style-react/dist/testkit/protractor';

const dataHook = 'my-button';

//Pass the data hook and expose the driver API
const driver = buttonTestkitFactory({dataHook});

//Go to your app URL which has the component in it
browser.get(appUrl);

//waitForVisibilityOf(..) waits untill the element/elements appears, and starts the tests.
//Otherwise it will timeout and print the 2nd arg as error message.
//This function accepts an element or an array of elements
waitForVisibilityOf(driver.element(), 'Cant find Button')
  .then(() => {

    //Do actual tests here
    expect(driver.getButtonText()).toBe('Click Me!');
    driver.click();
    expect(driver.getButtonText()).toBe('Clicked!');
  });
```
