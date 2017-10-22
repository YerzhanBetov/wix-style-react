const buttonWithOptionsDriverFactory = component => ({
  click: () => component.click(),
  getButton: () => component.$(`button`),
  getDropdown: () => component.$(`[data-hook="dropdown-layout-options"]`),
  getDropdownItem: index => component.$$(`[data-hook="dropdown-layout-options"] div`).get(index).getText(),
  getDropdownItemsCount: () => component.$$(`[data-hook="dropdown-layout-options"] div`).getText().count(),
  element: () => component
});

export default buttonWithOptionsDriverFactory;
