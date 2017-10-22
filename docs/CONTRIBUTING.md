# Contributing

We're thrilled to receive contributions, even on a rainy day :)

### Checklist

We want your input but we also want good quality. Hence contributors are required to:

* submit concise and clear issues with reproducible examples
* submit focused pull requests that tackle one thing only

### Contacts

* product/UI/UX [Ben Benhorin](https://wix.slack.com/messages/@benb)
* code/issues/PRs [Lior Belinksy (@lbelinsk)](https://github.com/lbelinsk) [Arijus Šukys (@argshook)](https://github.com/argshook)

## Setup

> __Note:__ This library depends on watchman, install it by following [this guide](https://facebook.github.io/watchman/docs/install.html).

```sh
nvm use
npm install
npm start
open localhost:6006
```

After `npm start` a local server will go live at `localhost:6006` with [storybook](https://storybook.js.org/) available.
storybook is your reference/sandbox for developing components.


See [Badge](https://github.com/wix/wix-style-react/blob/master/src/Badge/Badge.js) component for reference

### Running tests
`wix-style-react` runs `jest` as a test runner for unit tests and `protractor` for E2E tests.
 
#### Watch mode
During `npm start`, unit tests will run automatically on each file change.
You can run specific files or tests using `jest`'s interactive mode. For example, press `p` in your command line and type the name of the test.

![image](./ASSETS/JEST_INTERACTIVE.png)

### Components guidelines 

* One component per file
* All assets in `src/assets` folder
* e2e & unit test as well as enzyme & protractor testkits
* Prefer [controlled components](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)
* support `rtl` boolean prop to support right-to-left languages

### Adding new component

* Check github issues to see if no one else is working on the same component
* Each component in the library extends WixComponent, so please do it with you component as well.
* Use `WixComponent` as super class for your component, e.g.: `class MyComponent extends WixComponent`
* If you are using props from another component - use spread `...` instead of `Object.assign`, e.g:
```js
// bad
MyComponent.propTypes = Object.assign({},
  SomeOtherComponent.propTypes,
  {
    customProps: PropTypes.string
  }
);

// good
MyComponent.propTypes = {
  ...SomeOtherComponent.propTypes,
  customProps: PropTypes.string
};
``` 
It's important since in a good case we are able to automatically parse the source and create API docs for your component.
* Design according to [Zeplin](https://app.zeplin.io/project/5864e02695b5754a69f56150) design created by UX guild.
* Configure storybook to generate documentation for you, follow [Adding Story](https://wix.github.io/wix-style-react/?selectedKind=Introduction&selectedStory=Adding%20Story&full=0&down=0&left=1&panelRight=0) guide.
* Add unit and e2e tests as well as testkits for enzyme and protractor.
* Export your `testkitFactory` from the following files:
    * `wix-style-react/testkit/index.js`
    * `wix-style-react/testkit/enzyme.js`
    * `wix-style-react/testkit/protractor.js`
