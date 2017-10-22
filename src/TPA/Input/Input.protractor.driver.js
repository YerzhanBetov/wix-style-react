const inputDriverFactory = component => ({
  enterText: text => component.clear().sendKeys(text),
  getText: () => component.getAttribute('value'),
  element: () => component
});

export default inputDriverFactory;
