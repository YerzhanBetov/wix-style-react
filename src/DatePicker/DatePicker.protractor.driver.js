const datePickerDriverFactory = component => {
  const getInput = () => component.$('input');
  const getCalendar = () => component.$('.react-datepicker');
  const getNthAvailableDay = n => component.$$('[role="option"]:not([class*="outside-month"])').get(n);
  const getYearDropdown = () => component.$('[class$="year-read-view"]');
  const getNthYear = n => component.$$('[class*="year-option"]').get(n);
  const getMonthsDropdown = () => component.$('[class$="month-read-view"]');
  const getNthMonth = n => component.$$('[class*="month-option"]').get(n);

  return {
    inputDriver: {
      exists: () => getInput().isPresent(),
      isVisible: () => getInput().isDisplayed(),
      getValue: () => getInput().getAttribute('value'),
      click: () => getInput().click(),
      pressEnterKey: () => getInput().sendKeys(protractor.Key.ENTER),
      pressEscKey: () => getInput().sendKeys(protractor.Key.ESCAPE),
      pressTabKey: () => getInput().sendKeys(protractor.Key.TAB),
      pressArrowRightKey: () => getInput().sendKeys(protractor.Key.ARROW_RIGHT)
    },
    calendarDriver: {
      exists: () => getCalendar().isPresent(),
      isVisible: () => getCalendar().isDisplayed(),
      clickOnNthAvailableDay: (n = 0) => getNthAvailableDay(n).click(),
      openYearDropdownOptions: () => getYearDropdown().click(),
      clickOnNthYear: (n = 1) => getNthYear(n).click(),
      openMonthDropdownOptions: () => getMonthsDropdown().click(),
      clickOnNthMonth: (n = 0) => getNthMonth(n).click()
    }
  };
};

export default datePickerDriverFactory;
