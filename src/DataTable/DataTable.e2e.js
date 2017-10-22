import eyes from 'eyes.it';
import {dataTableTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';

describe('Data Table', () => {
  const storyUrl = getStoryUrl('Core', 'DataTable');
  const dataHook = 'story-data-table';

  eyes.it('should call func on row click', () => {
    const driver = dataTableTestkitFactory({dataHook});
    const indexToClick = 2;
    const name = 'Deborah Rhodes';

    browser.get(storyUrl);

    waitForVisibilityOf(driver.element(), 'Cant find Data Table Component')
      .then(() => {
        const rowData = driver.getRowTextByIndex(indexToClick);
        expect(rowData).toBe(`#${indexToClick + 1} ${name}`);
        driver.clickRowByIndex(indexToClick);

        const EC = protractor.ExpectedConditions;
        browser.wait(EC.alertIsPresent(), 10000, 'Alert is not getting present :(')
          .then(() => {
            expect(browser.switchTo().alert().getText()).toBe(`You clicked "${name}", row number ${indexToClick + 1}`);
            browser.switchTo().alert().accept();
          });
      });
  });
});
