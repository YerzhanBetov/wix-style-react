const popoverMenuDriverFactory = component => {
  let menuItemDataHook;
  const itemsArray = () => $$(
    menuItemDataHook.split(' ').reduce((q, hook) => q + `[data-hook~="${hook}"]`, '')
  );
  const itemAt = index => itemsArray().get(index);
  // before accessing menu methods one need to init driver with menu-item data hook
  const protect = fn => (...args) => {
    if (!menuItemDataHook) {
      throw new Error('Before accessing menu fields init menu item data hook with "driver.given.menuItemDataHook(\'myDataHook\')" command');
    }

    return fn(...args);
  };

  const driver = {
    exists: () => component.isPresent(),
    click: () => component.click(),
    element: () => component,

    init: {
      menuItemDataHook: dataHook => {
        menuItemDataHook = dataHook;

        return driver;
      }
    },

    menu: {
      isShown: protect(() => driver.menu.element().isDisplayed()),
      itemsLength: protect(() => itemsArray().count()),
      itemContentAt: protect(index => itemAt(index).$$('button >span').get(1).getText()),
      clickItemAt: protect(index => itemAt(index).click()),

      // menu items parent node (not actual menu root)
      element: protect(() => itemAt(0).element(by.xpath('..')))
    }
  };

  return driver;
};

export default popoverMenuDriverFactory;
