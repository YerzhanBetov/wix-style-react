import floatingTabItemDriverFactory from '../FloatingTabItem/FloatingTabItem.driver';
import buttonDriverFactory from '../Button/Button.driver';

const floatingTabsDriverFactory = ({element}) => {
  const containers = Array.from(element.childNodes).map(container => {
    return floatingTabItemDriverFactory({element: container});
  });

  const getButtonById = id => element.querySelector(`[data-hook="floating-tab-item-button-${id}"]`);

  return {
    exists: () => !!element,
    // clickOnTabAt: index => buttonDrivers[index].click(),
    activeContent: () => {
      const activeContent = containers.find(c => c.isActive());
      if (activeContent) {
        return activeContent.content();
      }
      return null;
    },
    activeTitle: () => {
      const activeContent = containers.find(c => c.isActive());
      if (activeContent) {
        return activeContent.content();
      }
      return null;
    },
    isButtonByIdExists: id => !!getButtonById(id),
    getButtonTextById: id => getButtonById(id).textContent,
    isButtonActive: id => {
      const button = getButtonById(id);

      if (button) {
        const buttonFactory = buttonDriverFactory({element: button});
        return buttonFactory.hasTheme('fill');
      }
      return undefined;
    },
    isButtonHasClass: (id, className) => {
      const button = getButtonById(id);

      if (button) {
        const buttonFactory = buttonDriverFactory({element: button});
        return buttonFactory.hasClass(className);
      }
      return undefined;
    },
    clickButtonById: id => {
      const button = getButtonById(id);
      if (button) {
        const buttonFactory = buttonDriverFactory({element: button});
        return buttonFactory.click();
      }
    }
  };
};

export default floatingTabsDriverFactory;
