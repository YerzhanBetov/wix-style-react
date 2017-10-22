# MultiSelect component

>   Multi select with tags and AutoComplete.

## MultiSelect Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| options | array of option | [] | - | Array of objects. Objects must have an Id and can can include *value* and *node*. If value is '-', a divider will be rendered instead. |
| onChange | func | - | + | A callback function to be called when the input value changed|
| value | string | - | - | The value of the current input |
| onSelect | func | - | - | Callback function called whenever the user selects a single option or multiple options (with copy paste). The function receives array of values as an argument. |
| onManuallyInput | func | noop | - | Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list |
| onRemoveTag | func | - | + | A callback function to be called when a tag should be removed|
| tags | array of objects | - | + | The tags. tags are just set of selected suggestions|
| placeholder | string | - | - | the placeholder for the input|
| id | string or number | '' | - | An identifier of the component |
| disabled | bool | false | - | When set to true this component is disabled |
| predicate | func | () => true | - | Callback predicate for the filtering options function |
| fixedHeader | node | - | - | A fixed header to the list |
| fixedFooter | node | - | - | A fixed footer to the list |
| delimiters | array | [','] (also Enter and Tab) | - | delimiters that will be treated like enter press |
| maxNumRows | number | - | - | Max number of visible lines |
| ***All of the InputWithOptions Props are also available for this component*** | | | | |

## Option

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| id | string or number | - | + | The id of the option, should be unique |
| value | string or node | - | + | Can be a text or a react elements, if text is '-', a divider will render at that position. |
| disabled | bool | false | - | Whether this option is disabled or not |
| tag | object | - | - | When selecting an option, it will be added as a Tag to the input container. This Tag property defines the Tag that will be displayed. A Tag object can have label, size, thumb and removable properties. In case no Tag object was provided, The value property will become the Label property of the rendered Tag.
