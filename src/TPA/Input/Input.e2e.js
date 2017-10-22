import eyes from 'eyes.it';
import {tpaInputTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../../testkit/protractor';

describe('TPA Input', () => {
  const storyUrl = getStoryUrl('TPA', 'Input');

  eyes.it('should enter value to Input', () => {
    const dataHook = 'story-input';
    const driver = tpaInputTestkitFactory({dataHook});

    browser.get(storyUrl);

    waitForVisibilityOf(driver.element(), 'Cannot find Input')
      .then(() => {
        driver.enterText('123');
        expect(driver.getText()).toBe('123');
      });
  });
});
