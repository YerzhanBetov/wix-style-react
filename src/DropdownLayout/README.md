# DropdownLayout component

> Dropdown layout Component to use in autocopmlete and select

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| options | array of option | - | - | Array of Option objects that will be render to the list |
| onSelect | func | - | - | Callback function called whenever the user selects a different option in the list |
| onClose | func | - | - | Callback function called whenever the user press escape or click outside the component |
| onClickOutside | func | - | - | Callback function called whenever the user click outside the component |
| dropDirectionUp | bool | false | - | Whether the component opens up or down |
| withArrow | bool | false | - | Whether the component has a pointing arrow to the top by default or bottom for dropDirectionUp |
| visible | bool | false | - | Should show or hide the component |
| selectedId | string/number | - | - | The id of the selected option in the list |
| tabIndex| number | 0 | - | Specifies the tab order of the component |
| fixedHeader | node | - | - | A fixed header to the list |
| fixedFooter | node | - | - | A fixed footer to the list |
| theme | string | - | - | The theme of the dropdown. currently only 'b2b' theme is supported |
| maxHeightPixels | number | 260 | - | Set the max height of the dropdownLayout in pixels |
| closeOnSelect | bool | true | - | Will preventDefault of the event when pressing the tab key|
| onMouseEnter | func | - | - | Callback function called whenever the user entered with the mouse to the dropdown layout|
| onMouseLeave | func | - | - | Callback function called whenever the user exited with the mouse from the dropdown layout|

## Option

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| id | string or number | - | + | The id of the option, should be unique |
| value | string or node | - | + | Can be a text or a react elements, if text is '-', a divider will render at that position. |
| disabled | bool | false | - | Whether this option is disabled or not |
| title | bool | false | - | Whether this option is a title or not |
| linkTo | string | - | - | When provided the option will be an anchor to the given value |
| overrideStyle | bool | false | - | When this is on, no external style will be added to this option, only the internal node style, for further information see the examples |
