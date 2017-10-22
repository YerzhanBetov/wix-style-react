import eyes from 'eyes.it';
import {editableSelectorTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';

describe('EditableSelector', () => {
  const storyUrl = getStoryUrl('4. Selection', '4.9 EditableSelector');
  const dataHook = 'story-editable-selector';
  let driver;

  beforeEach(() => {
    driver = editableSelectorTestkitFactory({dataHook});
    browser.get(storyUrl);
  });

  eyes.it('should render a title', () => {
    waitForVisibilityOf(driver.element(), 'Cannot find EditableSelector')
    .then(() => {
      expect(driver.title().getText()).toBe('Type of Seeds');
    });
  });


  eyes.it('should create a new option', () => {
    waitForVisibilityOf(driver.element(), 'Cannot find EditableSelector')
    .then(() => {
      const newOption = 'Shir';
      driver.createNewRow(newOption);
      driver.clickApprove();
      expect(driver.item(2).getText()).toBe(newOption);
    });
  });

  eyes.it('should not modify an option when edit is cancelled', () => {
    waitForVisibilityOf(driver.element(), 'Cannot find EditableSelector')
    .then(() => {
      const newOption = 'Shir';
      driver.editRow(1, newOption);
      driver.clickCancel();
      expect(driver.item(1).getText()).not.toBe(newOption);
    });
  });

  eyes.it('should save an option when edit is approved', () => {
    waitForVisibilityOf(driver.element(), 'Cannot find EditableSelector')
    .then(() => {
      const newOption = 'Shir';
      driver.editRow(1, newOption);
      driver.clickApprove();
      expect(driver.item(1).getText()).toBe(newOption);
    });
  });

  eyes.it('should select an option when clicked', () => {
    waitForVisibilityOf(driver.element(), 'Cannot find EditableSelector')
    .then(() => {
      driver.toggleItem(0);
      expect(driver.isSelected(0)).toBe(true);
    });
  });

  eyes.it('should delete an option', () => {
    waitForVisibilityOf(driver.element(), 'Cannot find EditableSelector')
    .then(() => {
      driver.deleteRow(1);
      expect(driver.items().count()).toBe(1);
    });
  });

});
