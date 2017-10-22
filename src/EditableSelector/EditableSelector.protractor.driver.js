
const getOptions = component => component.$$('[data-hook="editable-selector-item"]');
const getOption = (component, index) => getOptions(component).get(index);
const getRow = (component, index) => component.$$('[data-hook="editable-selector-row"]').get(index);
const hover = element => browser.actions().mouseMove(element).perform();
const enterText = (component, text) => component.$('[data-hook="edit-row-wrapper"] input').clear().sendKeys(text);

const editableSelectorDriverFactory = component => ({
  title: () => component.$('[data-hook="editable-selector-title"]').getText(),
  createNewRow: text => {
    component.$('[data-hook="new-row-button"]').click();
    enterText(component, text);
  },
  clickApprove: () => component.$('[data-hook="edit-row-approve-button"]').click(),
  item: index => getOption(component, index),
  editRow: (index, text) => {
    const row = getRow(component, index);
    hover(row);
    row.$('[data-hook="edit-item"]').click();
    enterText(component, text);

  },
  clickCancel: () => component.$('[data-hook="edit-row-cancel-button"]').click(),
  deleteRow: index => {
    const row = getRow(component, index);
    hover(row);
    row.$('[data-hook="delete-item"]').click();
  },
  items: () => getOptions(component),
  toggleItem: index => getOption(component, index).click(),
  isSelected: index => getOption(component, index).$('input').isSelected(),
  element: () => component
});

export default editableSelectorDriverFactory;
