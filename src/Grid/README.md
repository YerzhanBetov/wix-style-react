# Grid and Card

A grid container is based on rows with a 12 column layout.

For full documentation read [Bootstrap docs](http://getbootstrap.com/css/#grid)

## wix-style-react additions to bootstrap

#### Container

Use for main content area.

Use ".wix-container" instead of bootstrap's ".container". 

.wix-container adds to main content area: min width of 894px and max width of 1254px.

#### Card

The card is a container component of a rounded corner layout.

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| stretchVertically | bool | false | false | Should this Card stretch vertically inside the container |

#### Card.Header

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| title | string | - | + | The title of the card |
| subtitle | string | - | - | The subtitle of the card |
| withoutDivider | bool | false | - | Whether to show divider or not |

#### Card.ButtonHeader

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| title | string | - | + | The title of the card |
| subtitle | string | - | - | The subtitle of the card |
| buttonTitle | string | - | + | The text to write on the button |
| buttonOnClick | func | - | + | The onClick function |
| buttonPrefix | node | - | - | An optional Icon to put before the button |
| buttonSuffix | node | - | - | An optional Icon to put after the button |
| tooltip | node | - | - | If set, this tooltip will wrap the button |
| theme | string | 'standard' | - | Can be 'standard' or 'fullblue' |
| withoutDivider | bool | false | - | Whether to show divider or not |

#### Card.LinkHeader

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| title | string | - | + | The title of the card |
| subtitle | string | - | - | The subtitle of the card |
| linkTo | string | - | + | The link to send the user to |
| linkTitle | string | - | + | The link text |
| tooltip | node | - | - | If set, this tooltip will wrap the link |
| withoutDivider | bool | false | - | Whether to show divider or not |

#### Card.CollapsedHeader

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| title | string | - | + | The title of the card |
| subtitle | string | - | - | The subtitle of the card |
| collapsed | bool | false | - | True when the card should be collapsed |
| toggleSwitch | 'button' / 'switch' | 'switch' | - | The style of the collapsed card toggle |
| withoutDivider | bool | false | - | Whether to show divider or not |


#### Row

A simple row according to the bootstrap docs.

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| rtl | bool | - | - | Reverses the columns ordering |
| stretchViewsVertically | bool | - | - | Make all the views in that raw the same height |

#### AutoAdjustedRow

A row with as much columns as children with the same width.
Can be used for multiple (not more than 12) equal cards on the same row.
If you want that the children will be the at the same height, 
just add height: 100%; to them (if there isn't already).
if its a card just add the stretchVertically prop.
##### Notice that the span of each element will be 12 % {the number of children}, so in case of result greater than 0, you'll get incomplete line

#### Col

A simple column according to the bootstrap docs

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| span | number | - | + | The columns span of this column |
| rtl | bool | - | - | Causing the column to float right |
