# Wix Style React TPA

Here you will find components with default styling taken from the metasite's style params. In addition these styles can be overridden the TPA developer.

## How it works

Each component comes with a style sheet that is injected into the DOM with a wix-style attribute. The style sheet is added to the top of the head to allow your own styles to override default styles.

## Example

[Sample TPA Repo](https://github.com/wix-private/wix-style-tpa)

[Live](https://gilada.wixsite.com/mysite-32)

## Building a TPA Component
 
1. Give your component a displayName
 
2. Import the component styles using inline loader that runs only during build

``` javascript
let styles = {locals: {}};
try {
    styles = require('!css-loader?modules&camelCase&localIdentName="[path][name]__[local]__[hash:base64:5]"!sass-loader!./{your-component}.scss');
} catch (e) {}
```
3. Inject these styles at runtime by wrapping your component with the tpaStyleInjector, like this:
export default tpaStyleInjector({your-component}, styles);
 
4. See this example for some more details:
 
https://github.com/wix/wix-style-react/blob/wix-style-react-tpa/src/TPA/Button/
 
 
