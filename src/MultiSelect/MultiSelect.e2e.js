import {multiSelectTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';

describe('MultiSelect', () => {

  const storyUrl = getStoryUrl('3. Inputs', '3.8 Tags');

  it('should break to new line when needed', () => {
    const driver = multiSelectTestkitFactory({dataHook: 'multi-select'}),
      ELEMENT_HEIGHT_SINGLE_LINE = 38;

    browser.get(storyUrl);

    waitForVisibilityOf(driver.element(), 'Cannot find <MultiSelect/>')
      .then(() => {
        for (let i = 0; i < 9; i++) {
          driver.addTag();
        }

        return driver.getHeight();
      }).then(height => {
        expect(height).toBe(ELEMENT_HEIGHT_SINGLE_LINE);
      });
  });

});
