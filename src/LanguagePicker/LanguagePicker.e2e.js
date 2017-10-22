import eyes from 'eyes.it';
import {languagePickerTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';

describe('LanguagePicker', () => {
  const storyUrl = getStoryUrl('Core', 'LanguagePicker');
  const dataHook = 'story-languagePicker';

  eyes.it('should change the language', () => {
    const driver = languagePickerTestkitFactory({dataHook});

    browser.get(storyUrl);

    waitForVisibilityOf(driver.element(), 'Cannot find LanguagePicker')
      .then(() => {
        driver.mouseEnter();
        driver.getDropdownItem(2).click();
        expect($('#languagePicker-output').getText()).toBe('Hej');
      });
  });
});
