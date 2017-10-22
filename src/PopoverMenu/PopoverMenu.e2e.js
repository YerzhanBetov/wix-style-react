import {
  POPOVER_MENU_DATA_HOOK,
  POPOVER_MENU_ITEM_DATA_HOOK
} from '../../stories/Tooltip_New/Composite/PopoverMenuTemplate.helpers';

const EC = protractor.ExpectedConditions;

import {
    popoverMenuTestkitFactory,
    getStoryUrl,
    waitForVisibilityOf
} from '../../testkit/protractor';

describe('PopoverMenu', () => {
  const storyUrl = getStoryUrl('7. Tooltips', '7.3. Popover Menu');
  let driver;

  beforeEach(() => {
    driver = popoverMenuTestkitFactory({dataHook: POPOVER_MENU_DATA_HOOK})
      .init.menuItemDataHook(POPOVER_MENU_ITEM_DATA_HOOK);
    browser.get(storyUrl);
  });

  it('should show popover menu', () => {
    waitForVisibilityOf(driver.element(), 'Can not find PopoverMenu trigger element').then(() => {
      driver.click();

      waitForVisibilityOf(driver.menu.element(), 'Can not find PopoverMenu menu');
    });
  });

  it('should hide popover menu on item click', () => {
    waitForVisibilityOf(driver.element()).then(() => {
      driver.click();

      waitForVisibilityOf(driver.menu.element()).then(() => {
        driver.menu.clickItemAt(0);

        browser.wait(
          EC.stalenessOf(driver.menu.element()),
          5000,
          'PopoverMenu has not been hidden after menu item click',
        );
      });
    });
  });
});
