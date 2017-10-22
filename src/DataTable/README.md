# Data Table component

> A table component for displaying data

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| id | string | - | - | An id to pass to the table |
| data | array | [] | - | The data to display |
| columns | array | [] | - | Configuration of the table's columns. See table below |
| showHeaderWhenEmpty | bool | false | - | Should the table show the header when data is empty |
| rowDataHook | string or func | - | - | A string data-hook to apply to all table body rows. or a func which calculates the data-hook for each row  - Signature: `(rowData, rowNum) => string`|
| rowClass | string | - | - | A class to apply to all table body rows |
| dynamicRowClass | func | - | - | A func that gets row data and returns a class(es) to apply to that specific row |
| onRowClick | func | - | - | A callback method to be called on row click. Signature: `onRowClick(rowData, rowNum)` |
| onMouseEnterRow | func | - | - | A callback method to be called on row mouse enter. Signature: `onMouseEnterRow(rowData, rowNum)` |
| onMouseLeaveRow | func | - | - | A callback method to be called on row mouse leave. Signature: `onMouseLeaveRow(rowData, rowNum)` |
| infiniteScroll | bool | false | - | If true, table will not render all data to begin with, but will gradually render the data as the user scrolls |
| itemsPerPage | number | 20 | - | If infiniteScroll is on, this prop will determine how many rows will be rendered on each load |
| width | string | '100%' | - | The width of the fixed table. Can be in percentages or pixels. |
| hasMore | boolean | false | - | Whether there are more items to be loaded. Event listeners are removed if false.
| hideHeader | boolean | false | - | Should we hide the header of the table.
| loadMore | func | null | - | A callback when more items are requested by the user. |
| loader | node | Loading ...| - | The loader to show when loading more items. |
| useWindow | boolean | true | - | Add scroll listeners to the window, or else, the component's parentNode. |
| scrollElement | DOM Object | - | - | Add scroll listeners to specified DOM Object. |
| thPadding | string | '5px' | - | Table headers padding |
| thHeight | string | '36px' | - | Table headers height |
| thFontSize | string | '12px' | - | Table headers font size |
| thBorder | string | '1px' | - | Table headers border |
| thColor | string | '#123456' | - | Table headers color |
| thOpacity | string | '0.8' | - | Table headers opacity |
| thLetterSpacing | string | '1.5px' | - | Table headers letter spacing |
| rowDetails | func | - | - | Function that returns React component that will be rendered in row details section. Example: `rowDetails={(row, rowNum) => <MyRowDetailsComponent {...row} />}` |
| allowMultiDetailsExpansion | boolean | false | - | Allows to open multiple row details |
| onSortClick | func | - | - | A callback function called on each column title click. Signature `onSortClick(colData, colNum)` |

### Column object props

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| title | string or node | - | true | A string or any element, the column's header title  |
| render | func | - | true | A function to render column cells. The function will be called with each row's data and should return a jsx element. Signature: `render(rowData, rowNum)` |
| width | string | - | - | The width to apply to the column. No value means column will try to contain its children, if possible |
| important | bool | false | - | Whether font color should be stronger, more dominant |
| sortable | bool | false | - | Enables sorting by column |
| sortDescending | bool | - | - | Pass false - for ascending sort, true - for descending|
| style | string | - | - | Sets the column inline style |
