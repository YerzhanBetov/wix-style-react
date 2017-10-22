# MessageBox component

> Message box Layouts

## MessageBoxMarketerialLayout Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| title	 | Node | - | + | Title for Messag Box |
| content | Node | - | + | Content of the Message Box |
| primaryButtonLabel | string | - | + | Primary Button Label |
| secondaryButtonLabel | string | - | - | Secondary Button Label |
| onPrimaryButtonClick | func | - | - | Primary Button Click callback |
| onSecondaryButtonClick | func | - | - | Secondary Button Click handler |
| imageUrl | string | - | - | Header image url |
| onClose | func | - | + | Close callback |

## MessageBoxFunctionalLayout Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| hideFooter | bool | - | - | Hide or show footer |
| confirmText | string | - | - | Confirm button Label |
| cancelText | string | - | - | Cancel button Label |
| theme | string | - | - | theme of the message box, (green, blue , red) |
| onOk | func | - | - | Ok callback |
| onCancel | func | - | - | Cancel callback |
| onClose | func | onCancel | - | Close button callback, the default is onCancel callback |
| title | Node | - | - | title of the Message Box |
| children | array | - | - | Message box content |
| buttonsHeight | string | small | - | The size of the button, can be small, medium or large |
| closeButton | bool | true | - | Should the x button appear or not |
| disableCancel | bool | false | - | Disable cancel button |
| disableConfirmation | bool| false | - | Disable confirmation button |
| width| string | '600px' | - | Set the message box width |
| noBodyPadding| bool | false | - | Should the body of the layout will have surrounding padding |

## MessageBoxFunctionalLayout TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| exists | - | bool | fulfilled if element in the DOM |
| getConfirmationButton | - | element | returns the confirmation button element |
| getConfirmationButtonText | - | string | returns the confirmation button text |
| getCancellationButton | - | element | returns the cancellation button element |
| getCancellationButtonText | - | string | returns the cancellation button text |
| getHeaderCloseButton | - | element | returns the close button element |
| clickOnCancellationButton | - | - | clicks on the cancellation button |
| clickOnConfirmationButton | - | - | clicks on the confirmation button |
| clickOnHeaderCloseButton | - | - | clicks on the close button |
| isThemeExist | (green, blue , red) | bool | fulfilled if theme applied |
| getFooter | - | element | returns the footer element |
| getTitle | - | string | returns the  title of the Message Box |
| getChildBySelector | selector | child element | return the element inside the Message box content |
