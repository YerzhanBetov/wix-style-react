# Documenting Components

All components exported by `wix-style-react` are documented and displayed on our [github page](wix.github.io/wix-style-react/) (you probably are looking at it now).

This page is created with [Storybook](https://storybook.js.org). It displays automatically generated documentation.

## Adding a Story

story is a page with all details and examples of a component. Given small config, this page is generated automatically.

### Example

`stories/ToggleSwitch/index.js` ([view on github](https://github.com/wix/wix-style-react/blob/master/stories/ToggleSwitch/index.js)):

```js
// 1. import `story` function. It will create a story page
import story from '../utils/Components/Story';

// 2. call `story()` with object
story({
  category: 'Core',
  componentSrcFolder: 'ToggleSwitch'
});
```

Refer to __story()__ tab for full list `story` configuration API.
