import eyes from 'eyes.it';
import {datePickerTestkitFactory, getStoryUrl} from '../../testkit/protractor';
import autoExampleTestkitFactory from '../../stories/utils/Components/AutoExample/protractor.driver';

describe('DatePicker', () => {
  const storyUrl = getStoryUrl('Core', 'DatePicker');
  const autoExampleDriver = autoExampleTestkitFactory({dataHook: 'auto-example'});
  const {inputDriver, calendarDriver} = datePickerTestkitFactory({dataHook: 'storybook-datepicker'});

  beforeEach(() => {
    browser.get(storyUrl);
  });

  eyes.it('should not open calendar when disabled', () => {
    autoExampleDriver.get.toggle('storybook-DatePicker-disabled-toggle').click();
    inputDriver.click();

    expect(calendarDriver.exists()).toBe(false);
  });

  eyes.it('should not close calendar on selecting date with click when shouldCloseOnSelect prop set to false', () => {
    autoExampleDriver.get.toggle('storybook-DatePicker-shouldCloseOnSelect-toggle').click();
    inputDriver.click();
    calendarDriver.clickOnNthAvailableDay(1);

    expect(calendarDriver.exists()).toBe(true);
    expect(calendarDriver.isVisible()).toBe(true);
  });

  describe('default', () => {
    eyes.it('should show inputDriver', () => {
      expect(inputDriver.isVisible()).toBe(true);
    });

    eyes.it('should open calendar when click on inputDriver', () => {
      inputDriver.click();

      expect(calendarDriver.exists()).toBe(true);
      expect(calendarDriver.isVisible()).toBe(true);
    });

    eyes.it('should close calendar on selecting date with click', () => {
      inputDriver.click();
      calendarDriver.clickOnNthAvailableDay(1);

      expect(calendarDriver.exists()).toBe(false);
    });

    eyes.it('should close calendar on Escape key', () => {
      inputDriver.click();
      expect(calendarDriver.exists()).toBe(true);

      inputDriver.pressEscKey();
      expect(calendarDriver.exists()).toBe(false);
    });

    eyes.it('should close calendar on Tab key', () => {
      inputDriver.click();
      expect(calendarDriver.exists()).toBe(true);

      inputDriver.pressTabKey();
      expect(calendarDriver.exists()).toBe(false);
    });

    eyes.it('should not change date', () => {
      inputDriver.click();
      inputDriver.pressEnterKey();

      expect(inputDriver.getValue()).toBe('2017/01/01');
    });

    eyes.it('should select next day date', () => {
      inputDriver.click();
      inputDriver.pressArrowRightKey();
      inputDriver.pressEnterKey();

      expect(inputDriver.getValue()).toBe('2017/01/02');
    });
  });

  describe('with year and month dropdown', () => {
    beforeEach(() => {
      browser.get(storyUrl);
      autoExampleDriver.get.toggle('storybook-DatePicker-showYearDropdown-toggle').click();
      autoExampleDriver.get.toggle('storybook-DatePicker-showMonthDropdown-toggle').click();
    });

    eyes.it('should select 2027 year', () => {
      inputDriver.click();
      calendarDriver.openYearDropdownOptions();
      calendarDriver.clickOnNthYear();
      calendarDriver.clickOnNthAvailableDay();

      expect(inputDriver.getValue()).toBe('2027/01/01');
    });

    eyes.it('should select February', () => {
      inputDriver.click();
      calendarDriver.openMonthDropdownOptions();
      calendarDriver.clickOnNthMonth(2);
      calendarDriver.clickOnNthAvailableDay();

      expect(inputDriver.getValue()).toBe('2017/02/01');
    });

    eyes.it('should select January and 2027 year', () => {
      inputDriver.click();
      calendarDriver.openYearDropdownOptions();
      calendarDriver.clickOnNthYear();
      calendarDriver.openMonthDropdownOptions();
      calendarDriver.clickOnNthMonth();
      calendarDriver.clickOnNthAvailableDay();

      expect(inputDriver.getValue()).toBe('2027/01/01');
    });
  });
});
