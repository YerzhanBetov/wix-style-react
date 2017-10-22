const TextLinkDriverFactory = component => ({
  exists: () => !!component,
  click: () => component.click(),
  getTextContent: () => component.getText(),
  element: () => component
});

export default TextLinkDriverFactory;
