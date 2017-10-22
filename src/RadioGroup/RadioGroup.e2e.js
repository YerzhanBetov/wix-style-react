import eyes from 'eyes.it';
import {radioGroupTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';

describe('RadioGroup', () => {
  const storyUrl = getStoryUrl('4. Selection', '4.3 Radio Button Group');
  const dataHook = 'story-radio-group';

  eyes.it('should select the second option in a group', () => {
    const driver = radioGroupTestkitFactory({dataHook});

    browser.get(storyUrl);

    waitForVisibilityOf(driver.element(), 'Cannot find RadioGroup')
      .then(() => {
        driver.selectByIndex(1).click();
        expect(driver.isRadioChecked(1)).toBe(true);
      });
  });

  eyes.it('should do not select disabled option', () => {
    const driver = radioGroupTestkitFactory({dataHook});

    browser.get(storyUrl);

    waitForVisibilityOf(driver.element(), 'Cannot find RadioGroup')
      .then(() => {
        expect(driver.isRadioDisabled(3)).toBe(true);
        driver.selectByIndex(3).click();
        expect(driver.isRadioChecked(3)).toBe(false);
      });
  });
});
