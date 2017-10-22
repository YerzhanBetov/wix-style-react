import {toggleSwitchTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';
import eyes from 'eyes.it';

describe('toggle switch page', () => {
  const storyUrl = getStoryUrl('Core', 'ToggleSwitch');

  const xSmallSwitchDataHook = 'controlled-switch-x-small';
  const smallSwitchDataHook = 'controlled-switch-small';
  const largeSwitchDataHook = 'controlled-switch-large';

  beforeEach(() => {
    browser.get(storyUrl);
  });

  eyes.it('should render x-small toggle switch', () => {
    const driver = toggleSwitchTestkitFactory({dataHook: xSmallSwitchDataHook});

    waitForVisibilityOf(driver.element(), 'Cant find ToggleSwitch')
      .then(() => {
        expect(driver.isXSmall()).toBe(true);
      });
  });

  eyes.it('should render small toggle switch', () => {
    const driver = toggleSwitchTestkitFactory({dataHook: smallSwitchDataHook});

    waitForVisibilityOf(driver.element(), 'Cant find ToggleSwitch')
      .then(() => {
        expect(driver.isSmall()).toBe(true);
      });
  });

  eyes.it('should render large switch', () => {
    const driver = toggleSwitchTestkitFactory({dataHook: largeSwitchDataHook});

    waitForVisibilityOf(driver.element(), 'Cant find ToggleSwitch')
      .then(() => {
        expect(driver.isLarge()).toBe(true);
      });
  });

  eyes.it('should change state on click', () => {
    const driver = toggleSwitchTestkitFactory({dataHook: smallSwitchDataHook});

    waitForVisibilityOf(driver.element(), 'Cant find ToggleSwitch')
      .then(() => {
        expect(driver.checked()).toBe(false);
        driver.click();
        expect(driver.checked()).toBe(true);
      });
  });

});
