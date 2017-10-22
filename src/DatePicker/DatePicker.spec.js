import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';
import {createDriverFactory} from '../test-common';
import moment from 'moment';
import applyPolyfills from './Polyfills';
import {datePickerTestkitFactory} from '../../testkit/index';
import {datePickerTestkitFactory as enzymeDatePickerTestkitFactory} from '../../testkit/enzyme';
import datePickerDriverFactory from './DatePicker.driver';
import Input from '../Input';
import DatePicker from './DatePicker';

describe('DatePicker', () => {
  const createDriver = createDriverFactory(datePickerDriverFactory);
  let onChange;

  applyPolyfills(window, global);

  beforeEach(() => {
    onChange = jest.fn();
  });

  describe('date picker input', () => {
    it('should exist', () => {
      const {inputDriver} = createDriver(<DatePicker onChange={onChange}/>);

      expect(inputDriver.exists()).toBe(true);
    });

    it('should set inputDataHook from props', () => {
      const {inputDriver} = createDriver(<DatePicker onChange={onChange} inputDataHook={'inputDataHook'}/>);

      expect(inputDriver.getDataHook()).toBe('inputDataHook');
    });

    it('should set datePicker disabled from props', () => {
      const {inputDriver} = createDriver(<DatePicker onChange={onChange} disabled/>);

      expect(inputDriver.isDisabled()).toBeTruthy();
    });

    it('should not open calendar when disabled', () => {
      const {inputDriver, calendarDriver} = createDriver(<DatePicker onChange={onChange} disabled/>);

      inputDriver.trigger('click');
      expect(calendarDriver.isVisible()).toBe(false);
    });

    it('should show correct value from props', () => {
      const date = new Date(2017, 9, 2);
      const {inputDriver} = createDriver(<DatePicker onChange={onChange} value={moment(date)}/>);

      expect(inputDriver.getValue()).toBe('10/02/2017');
    });

    it('should show correct value from props depends on date format', () => {
      const date = new Date(2017, 9, 2);
      const {inputDriver} = createDriver(<DatePicker
        onChange={onChange} value={moment(date)}
        dateFormat={'DD/MM/YYYY'}
        />);

      expect(inputDriver.getValue()).toBe('02/10/2017');
    });

    it('should set placeholder from placeholderText property', () => {
      const {inputDriver} = createDriver(<DatePicker
        onChange={onChange}
        placeholderText={'Datepicker test placeholder'}
        />);

      expect(inputDriver.getPlaceholder()).toBe('Datepicker test placeholder');
    });

    it('should set placeholder from placeholder property for customInput', () => {
      const {inputDriver} = createDriver(<DatePicker
        onChange={onChange}
        customInput={<Input placeholder={'Input test placeholder'}/>}
        />);

      expect(inputDriver.getPlaceholder()).toBe('Input test placeholder');
    });

    it('should set placeholder from placeholder property for customInput even if placeholderText property was specified', () => {
      const {inputDriver} = createDriver(<DatePicker
        onChange={onChange}
        customInput={<Input placeholder={'customInputPlaceholder'}/>}
        placeholderText={'textPlaceholder'}
        />);

      expect(inputDriver.getPlaceholder()).toBe('customInputPlaceholder');
    });

    it('should be readonly', () => {
      const {inputDriver} = createDriver(<DatePicker
        onChange={onChange}
        readOnly
        />);

      expect(inputDriver.getReadOnly()).toBeTruthy();
    });

    it('should not be readonly', () => {
      const {inputDriver} = createDriver(<DatePicker
        onChange={onChange}
        />);

      expect(inputDriver.getReadOnly()).toBeFalsy();
    });

    it('has prefix by default', () => {
      const {inputDriver} = createDriver(<DatePicker
        onChange={onChange}
        />);

      expect(inputDriver.hasPrefix()).toBe(true);
    });

    it('has custom prefix', () => {
      const {inputDriver} = createDriver(<DatePicker
        onChange={onChange}
        prefix={<span>#</span>}
        />);

      expect(inputDriver.hasPrefix()).toBe(true);
    });
  });

  describe('calendar', () => {
    it('should not show calendar on start', () => {
      const {calendarDriver} = createDriver(<DatePicker onChange={onChange}/>);

      expect(calendarDriver.isVisible()).toBe(false);
    });

    it('should not call onChange when select selected date with enter', () => {
      const value = moment(new Date(2017, 5, 2));
      const {inputDriver} = createDriver(<DatePicker value={value} onChange={onChange}/>);

      inputDriver.trigger('click');
      inputDriver.trigger('keyDown', {key: 'Enter'});

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should not call onChange when select selected date with click', () => {
      const value = moment(new Date(2017, 5, 1));
      const {calendarDriver, inputDriver} = createDriver(<DatePicker value={value} onChange={onChange}/>);

      inputDriver.trigger('click');
      calendarDriver.clickOnNthDay();

      expect(onChange).not.toHaveBeenCalled();
    });

    describe('should be opened', () => {
      it('on click on datePickerInput', () => {
        const {calendarDriver, inputDriver} = createDriver(<DatePicker onChange={onChange}/>);

        inputDriver.trigger('click');
        expect(calendarDriver.isVisible()).toBe(true);
      });

      it('on select with ArrowUp key', () => {
        const value = moment(new Date(2017, 5, 2));
        const {inputDriver, calendarDriver} = createDriver(<DatePicker value={value} onChange={onChange}/>);

        inputDriver.trigger('keyDown', {key: 'ArrowUp'});
        expect(calendarDriver.isVisible()).toBe(true);
      });
    });

    describe('should be closed', () => {
      it('on select date with Enter key', () => {
        const value = moment(new Date(2017, 5, 2));
        const {inputDriver, calendarDriver} = createDriver(<DatePicker value={value} onChange={onChange}/>);

        inputDriver.trigger('click');
        inputDriver.trigger('keyDown', {key: 'ArrowRight'});
        inputDriver.trigger('keyDown', {key: 'Enter'});

        expect(calendarDriver.isVisible()).toBe(false);
      });

      it('on select date with click', () => {
        const {inputDriver, calendarDriver} = createDriver(<DatePicker onChange={onChange}/>);

        inputDriver.trigger('click');
        calendarDriver.clickOnNthDay();

        expect(calendarDriver.isVisible()).toBe(false);
      });

      it('on press "Escape" key', () => {
        const {inputDriver, calendarDriver} = createDriver(<DatePicker onChange={onChange}/>);

        inputDriver.trigger('click');
        inputDriver.trigger('keyDown', {key: 'Escape'});

        expect(calendarDriver.isVisible()).toBe(false);
      });

      it('on press "Tab" key', () => {
        const {inputDriver, calendarDriver} = createDriver(<DatePicker onChange={onChange}/>);

        inputDriver.trigger('click');
        inputDriver.trigger('keyDown', {key: 'Tab'});

        expect(calendarDriver.isVisible()).toBe(false);
      });
    });

    it('should not close calendar on select when "shouldCloseOnSelect" property is false', () => {
      const {inputDriver, calendarDriver} = createDriver(
        <DatePicker
          onChange={onChange}
          shouldCloseOnSelect={false}
          />
      );

      inputDriver.trigger('click');
      calendarDriver.clickOnNthDay();

      expect(calendarDriver.isVisible()).toBe(true);
    });

    it('should call onChange when click on available day', () => {
      const value = moment(new Date(2017, 7, 1));
      const expectedValue = moment(new Date(2017, 7, 2));
      const {calendarDriver, inputDriver} = createDriver(
        <DatePicker
          value={value}
          onChange={onChange}
          />
      );
      inputDriver.trigger('click');
      calendarDriver.clickOnNthDay(1);

      const newValue = onChange.mock.calls[0][0];

      expect(onChange).toHaveBeenCalled();
      expect(newValue.diff(expectedValue)).toBe(0);
    });

    it('should not give an ability to select past dates if it is specified in props', () => {
      const date = moment(new Date(2015, 9, 2));
      const {calendarDriver, inputDriver} = createDriver(
        <DatePicker
          onChange={onChange}
          value={date}
          excludePastDates
          />
      );

      inputDriver.trigger('click');
      calendarDriver.clickOnNthDay();

      expect(onChange).not.toHaveBeenCalled();
      expect(calendarDriver.isVisible()).toBe(true);
    });

    it('should select previous month on previous month button click', () => {
      const date = moment(new Date(2015, 9, 2));
      const {calendarDriver, inputDriver} = createDriver(
        <DatePicker
          onChange={onChange}
          value={date}
          />
      );

      inputDriver.trigger('click');
      calendarDriver.clickOnPrevMonthButton();
      calendarDriver.clickOnNthDay();

      const newDate = onChange.mock.calls[0][0];
      expect(newDate.month()).toEqual(8);
    });

    it('should select previous month on next month button click', () => {
      const date = moment(new Date(2015, 9, 2));
      const {calendarDriver, inputDriver} = createDriver(
        <DatePicker
          onChange={onChange}
          value={date}
          />
      );

      inputDriver.trigger('click');
      calendarDriver.clickOnNextMonthButton();
      calendarDriver.clickOnNthDay();

      const newDate = onChange.mock.calls[0][0];
      expect(newDate.month()).toEqual(10);
    });

    it('should show header by default', () => {
      const date = moment(new Date(2015, 9, 2));
      const {calendarDriver, inputDriver} = createDriver(
        <DatePicker onChange={onChange} value={date}/>
      );

      inputDriver.trigger('click');
      expect(calendarDriver.isHeaderVisible()).toEqual(true);
    });

    it('should hide header if year dropdown is visible', () => {
      const date = moment(new Date(2015, 9, 2));
      const {calendarDriver, inputDriver} = createDriver(
        <DatePicker
          onChange={onChange}
          showYearDropdown
          value={date}
          />
      );

      inputDriver.trigger('click');
      expect(calendarDriver.isHeaderVisible()).toEqual(false);
    });

    it('should hide header if month dropdown is visible', () => {
      const date = moment(new Date(2015, 9, 2));
      const {calendarDriver, inputDriver} = createDriver(
        <DatePicker
          onChange={onChange}
          showMonthDropdown
          value={date}
          />
      );

      inputDriver.trigger('click');
      expect(calendarDriver.isHeaderVisible()).toEqual(false);
    });

    describe('with year dropdown', () => {
      it('should give a possibility to choose date from another year', () => {
        const date = moment(new Date(2015, 9, 2));
        const {calendarDriver, inputDriver} = createDriver(
          <DatePicker
            onChange={onChange}
            showYearDropdown
            value={date}
            />
        );

        inputDriver.trigger('click');
        calendarDriver.clickOnYearDropdown();
        calendarDriver.clickOnNthYear();
        calendarDriver.clickOnNthDay();

        const newDate = onChange.mock.calls[0][0];
        expect(newDate.year()).not.toEqual(date.year());
      });
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'dataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div>
          <DatePicker
            onChange={() => {
            }}
            dataHook={dataHook}
            />
        </div>
      ));
      const {driver, calendarDriver, inputDriver} = datePickerTestkitFactory({wrapper, dataHook});

      expect(driver.exists()).toBe(true);
      expect(inputDriver.exists()).toBe(true);
      expect(calendarDriver.isVisible()).toBe(false);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'dataHook';
      const wrapper = mount(<DatePicker
        onChange={() => {
        }}
        dataHook={dataHook}
        />);
      const {driver, calendarDriver, inputDriver} = enzymeDatePickerTestkitFactory({wrapper, dataHook});

      expect(driver.exists()).toBe(true);
      expect(inputDriver.exists()).toBe(true);
      expect(calendarDriver.isVisible()).toBe(false);
    });
  });
});
