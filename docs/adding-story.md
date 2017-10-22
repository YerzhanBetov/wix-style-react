# Adding Story

All components exported by `wix-style-react` are documented and displayed on our [github page](wix.github.io/wix-style-react/) (you probably are looking at it now).

To create this sandbox environment we use [Storybook](https://storybook.js.org).

Creating a page for each component is tedious and problematic. For this reason we generate documentation right out of components source.
It is possible by using the following helpers:

* `story()`  
* `<AutoDocs/>`
* `<AutoExample/>`

You should use `story()` function most of the time, unless your component is very very special and `story()` cannot handle it properly.

## Generating story page automatically

Let's consider `<ColorPicker/>` component example:

`stories/ColorPicker/index.js` ([view on github](https://github.com/wix/wix-style-react/blob/master/stories/ColorPicker/index.js)):

```js
// 1. import `story` function. It will do all the heavy lifting to create a story page
import story from '../utils/Components/Story';

// 2. import `component` which you want to display (`<ColorPicker/>` in this example)
import component from 'wix-style-react/ColorPicker';
// 3. import `source` of the same component. This is possible by using `!raw-loader!`
import source from '!raw-loader!wix-style-react/ColorPicker/color-picker';

// 4. use `story()` with not-that-big-of-a-config to create full Storybook page.
story({
  category: 'Core',
  name: 'ColorPicker',
  source,
  component
});

// 

```
__OR__, much easy way:

`stories/ToggleSwitch/index.js` ([view on github](https://github.com/wix/wix-style-react/blob/master/stories/ToggleSwitch/index.js)):
```js
// 1. import `story` function. It will do all the heavy lifting to create a story page
import story from '../utils/Components/Story';

// 2. use `story()` with even-less-configuration 🎉🎉🎉 to create full Storybook page.
story({
  category: 'Core',
  componentSrcFolder: 'ToggleSwitch',
  // the rest of props in the source is specific to that component, but you see the fully working example!
});
```