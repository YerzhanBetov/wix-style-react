import {badgeTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';

describe('Badge', () => {

  const storyUrl = getStoryUrl('Core', 'Badge');

  it('should render given valid props', () => {
    const driver = badgeTestkitFactory({dataHook: 'badgeH2Primary'});

    browser.get(storyUrl);

    waitForVisibilityOf(driver.element(), 'Cannot find <Badge/>')
      .then(() => {
        expect(driver.text()).toBe('Primary H2');
        expect(driver.isBadge()).toBe(true);
        expect(driver.isOfType('primary')).toBe(true);
        expect(driver.isOfAppearance('H2')).toBe(true);
        expect(driver.isOfAlignment('middle')).toBe(true);
        expect(driver.isOfShape('ellipse')).toBe(true);
      });
  });

});
