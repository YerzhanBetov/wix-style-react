import ReactTestUtils from 'react-dom/test-utils';
import inputDriverFactory from '../Input/Input.driver';

const datePickerDriverFactory = ({element, wrapper}) => {

  const inputRoot = element && element.children[0].querySelector('.root');
  const inputDriver = inputDriverFactory({element: inputRoot, wrapper});
  const getCalendar = () => element.querySelector('.react-datepicker');
  const getNthDay = n => element.querySelectorAll('[role="option"]:not([class*="outside-month"])')[n];
  const getYearDropdown = () => element.querySelector('[class$="year-read-view"]');
  const getNthYear = n => element.querySelectorAll('[class*="year-option"]')[n];
  const getPrevMonthButton = () => element.querySelector('[class$="navigation--previous"]');
  const getNextMonthButton = () => element.querySelector('[class$="navigation--next"]');

  const driver = {
    exists: () => !!element
  };

  const calendarDriver = {
    isVisible: () => !!getCalendar(),
    clickOnNthDay: (n = 0) => ReactTestUtils.Simulate.click(getNthDay(n)),
    clickOnYearDropdown: () => ReactTestUtils.Simulate.click(getYearDropdown()),
    clickOnNthYear: (n = 1) => ReactTestUtils.Simulate.click(getNthYear(n)),
    clickOnPrevMonthButton: () => ReactTestUtils.Simulate.click(getPrevMonthButton()),
    clickOnNextMonthButton: () => ReactTestUtils.Simulate.click(getNextMonthButton()),
    isHeaderVisible: () => !(wrapper.querySelector('.react-datepicker--hide-header'))
  };

  return {
    driver,
    inputDriver,
    calendarDriver
  };
};

export default datePickerDriverFactory;
