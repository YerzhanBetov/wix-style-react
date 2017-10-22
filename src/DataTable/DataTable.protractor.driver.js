
const dataTableDriverFactory = component => ({
  clickRowByIndex: index => component.$$('tbody tr').get(index).click(),
  getRowTextByIndex: index => component.$$('tbody tr').get(index).getText(),
  element: () => component
});

export default dataTableDriverFactory;
