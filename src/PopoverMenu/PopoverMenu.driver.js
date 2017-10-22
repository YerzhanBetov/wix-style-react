import ReactTestUtils from 'react-dom/test-utils';

const popoverMenuDriverFactory = ({element}) => {
  let menuItemDataHook;
  // before accessing menu methods one need to init driver with menu-item data hook
  const protect = fn => (...args) => {
    if (!menuItemDataHook) {
      throw new Error('Before accessing menu fields init menu item data hook with "driver.given.menuItemDataHook(\'myDataHook\')" command');
    }

    return fn(...args);
  };

  const itemsArray = () => [
    ...document.body.querySelectorAll(
      menuItemDataHook.split(' ').reduce((q, hook) => q + `[data-hook~="${hook}"]`, '')
    )
  ];

  const driver = {
    exists: () => !!element,
    click: () => ReactTestUtils.Simulate.click(element),

    init: {
      menuItemDataHook: dataHook => {
        menuItemDataHook = dataHook;

        return driver;
      }
    },

    menu: {
      isShown: protect(() => itemsArray().length > 0),
      itemsLength: protect(() => itemsArray().length),
      itemContentAt: protect(index => itemsArray()[index].querySelectorAll('button >span')[1].innerHTML),
      clickItemAt: protect(index => ReactTestUtils.Simulate.click(itemsArray()[index].querySelector('button')))
    }
  };

  return driver;
};

export default popoverMenuDriverFactory;
