# TextLink component

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| link | string | - | + | The link itself e.g. 'https://www.wix.com' |
| children | node | - | - | The node to render, <TextLink>I am a children</TextLink> |
| rel | string | - | - | Must be a valid rel attribute according to <a> tag |
| target | string | - | - | Must be a valid target attribute according to <a> tag |
| download | boolean | false | - | Specifies that the target will be downloaded when a user clicks on the hyperlink |
| underlineStyle | 'always'/'hover'/'never' | hover | - | Hover - show the underline only on hover, Always - always show underline, Never - never show underline |
| darkBackground | bool | - | - | Whether to use dark background |
| size | 'small'/'medium' | 'medium' | - | The size of the button |
| disabled | bool | false | - | disables the link and the onClick |
| onClick | func | - | - | Callback for the text link click, receiving the click event as first parameter |
| ariaLabel | string | - | - | The aria label for accessibility, by default it will be the link text |
