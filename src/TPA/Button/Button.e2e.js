import eyes from 'eyes.it';
import {tpaButtonTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../../testkit/protractor';

describe('TPA Button', () => {
  const storyUrl = getStoryUrl('TPA', 'Button');
  const beforeClickState = 'Click Me!';
  const clickedState = 'Clicked!';

  beforeEach(() => {
    browser.get(storyUrl);
  });

  eyes.it('should click a button', () => {
    const dataHook = 'story-button-enabled';
    const driver = tpaButtonTestkitFactory({dataHook});

    waitForVisibilityOf(driver.element(), 'Cannot find Button')
      .then(() => {
        expect(driver.getButtonTextContent()).toBe(beforeClickState);
        driver.click();
        expect(driver.getButtonTextContent()).toBe(clickedState);
      });
  });

  eyes.it('should render disabled, suffixIcon, prefixIcon buttons correctly', () => {
    const dataHookDisabled = 'story-button-disabled';
    const driverDisabled = tpaButtonTestkitFactory({dataHook: dataHookDisabled});

    waitForVisibilityOf([driverDisabled.element()], 'Cannot find Button')
      .then(() => {
        expect(driverDisabled.isButtonDisabled()).toBe(true);
      });
  });
});
