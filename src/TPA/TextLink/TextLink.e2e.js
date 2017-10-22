import eyes from 'eyes.it';
import {tpaTextLinkTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../../testkit/protractor';

describe('TPA TextLink', () => {
  const storyUrl = getStoryUrl('TPA', 'TextLink');
  const linkText = 'Click me';
  const expectedUrlAfterClick = 'https://wix.github.io/wix-style-react/?selectedKind=Introduction&selectedStory=Getting%20started&full=0&down=0&left=1&panelRight=0';

  eyes.it('should nav to new address after click', () => {
    const dataHook = 'story-text-link';
    const driver = tpaTextLinkTestkitFactory({dataHook});

    browser.get(storyUrl);

    waitForVisibilityOf(driver.element(), 'Cannot find text link')
      .then(() => {
        expect(driver.getTextContent()).toBe(linkText);
        driver.click();
        expect(browser.getCurrentUrl()).toBe(expectedUrlAfterClick);
      });
  });
});
