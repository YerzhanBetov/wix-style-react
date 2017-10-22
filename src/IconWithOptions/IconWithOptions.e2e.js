import eyes from 'eyes.it';
import {iconWithOptionsTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';

describe('IconWithOptions', () => {
  const storyUrl = getStoryUrl('4. Selection', '4.5 IconWithOptions');
  const dataHook = 'story-iconWithOptions';

  eyes.it('should hide dropdown when selecting an option which is not already selected', () => {
    browser.get(storyUrl);
    const driver = iconWithOptionsTestkitFactory({dataHook});

    waitForVisibilityOf(driver.element(), 'Cannot find iconWithOptions')
    .then(() => {
      driver.mouseEnter();
      driver.getDropdownItem(1).click();

      driver.mouseLeave();
      driver.mouseEnter();
      driver.getDropdownItem(1).click();
      expect(driver.getDropdown().isDisplayed()).toBe(true);
    });
  });
});
