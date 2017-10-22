const buttonDriverFactory = component => ({
  click: () => component.click(),
  getButtonTextContent: () => component.getText(),
  isButtonDisabled: () => !!component.getAttribute('disabled'),
  element: () => component
});

export default buttonDriverFactory;
