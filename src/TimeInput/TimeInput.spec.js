import React from 'react';
import TimePicker from './TimeInput';
import timeInputDriverFactory from './TimeInput.driver';
import {createDriverFactory} from '../test-common';
import moment from 'moment';
import sinon from 'sinon';
import {isTestkitExists, isEnzymeTestkitExists} from '../../testkit/test-common';
import {timeInputTestkitFactory} from '../../testkit';
import {timeInputTestkitFactory as enzymeTimeInputTestkitFactory} from '../../testkit/enzyme';

describe('TimeInput', () => {
  const createDriver = createDriverFactory(timeInputDriverFactory);
  const format12Hours = time => time.format('hh:mm');
  const format24Hours = time => time.format('HH:mm');

  describe('Time display', () => {
    it(`should render the given default value`, () => {
      const props = {
        defaultValue: moment()
      };
      const driver = createDriver(<TimePicker {...props}/>);
      expect(driver.getValue()).toBe(format12Hours(props.defaultValue));
    });

    it(`should render the current time if no default value were passed `, () => {
      const driver = createDriver(<TimePicker/>);
      const currentTime = moment();
      const currentTimeHours = format12Hours(currentTime).substring(0, 2);
      const currentTimeMinutes = format12Hours(currentTime).substring(3, 5);
      const inputTimeHours = driver.getValue().substring(0, 2);
      const inputTimeMinutes = driver.getValue().substring(3, 5);
      const minutesDiff = Math.abs((parseInt(inputTimeMinutes) - parseInt(currentTimeMinutes)));
      expect(inputTimeHours).toBe(currentTimeHours);
      expect(minutesDiff <= 1).toBeTruthy(); //ignore diff of one minute (minute can be change from the time the object was created to current time)
    });

    it(`should allow rendering time in 24 hours mode`, () => {
      const props = {
        defaultValue: moment(),
        disableAmPm: true
      };
      const driver = createDriver(<TimePicker {...props}/>);
      expect(driver.getValue()).toBe(format24Hours(props.defaultValue));
    });

    it(`should display am/pm indicator when in 12 hours mode`, () => {
      const props = {
        defaultValue: moment(),
        disableAmPm: false
      };
      const driver = createDriver(<TimePicker {...props}/>);
      expect(driver.isAmPmIndicatorExist()).toBeTruthy();
    });

    it(`should display AM indicator when in 12 hours mode and the time displayed is AM`, () => {
      const props = {
        defaultValue: moment('1/25/1982 9:30 AM'),
        disableAmPm: false
      };
      const driver = createDriver(<TimePicker {...props}/>);
      expect(driver.getAmPmIndicatorText()).toBe('am');
    });

    it(`should display AM indicator when in 12 hours mode and the time displayed is PM`, () => {
      const props = {
        defaultValue: moment('1/25/1982 9:30 PM'),
        disableAmPm: false
      };
      const driver = createDriver(<TimePicker {...props}/>);
      expect(driver.getAmPmIndicatorText()).toBe('pm');
    });
  });

  describe('Input change', () => {
    it(`should trigger 'onChange' callBack upon clicking input's up/down ticker`, () => {
      const props = {
        onChange: sinon.spy()
      };
      const driver = createDriver(<TimePicker {...props}/>);
      driver.clickTickerUp();
      driver.clickTickerDown();
      expect(props.onChange.calledTwice).toBeTruthy();
    });

    it(`should not do anything upon clicking input's up/down ticker when disabled`, () => {
      const props = {
        onChange: sinon.spy(),
        disabled: true
      };
      const driver = createDriver(<TimePicker {...props}/>);

      driver.clickTickerUp();
      driver.clickTickerDown();
      expect(props.onChange.called).toBeFalsy();
    });

    it(`should increase input value by 20 minutes upon clicking the input's up ticker`, () => {
      const props = {
        defaultValue: moment()
      };
      const driver = createDriver(<TimePicker {...props}/>);
      driver.clickTickerUp();
      expect(driver.getValue()).toBe(format12Hours(props.defaultValue.add(20, 'minutes')));
    });

    it(`should decrease input value by 20 minutes upon clicking the input's down ticker`, () => {
      const props = {
        defaultValue: moment()
      };
      const driver = createDriver(<TimePicker {...props}/>);
      driver.clickTickerDown();
      expect(driver.getValue()).toBe(format12Hours(props.defaultValue.subtract(20, 'minutes')));
    });

    it(`should allow to change time using keyboard's input`, () => {
      const props = {
        defaultValue: moment()
      };
      const driver = createDriver(<TimePicker {...props}/>);
      driver.setValue('12:00');
      driver.blur();
      expect(driver.getValue()).toBe('12:00');
    });

    it(`should not allow to enter non numeric charecters using keyboard's input, it should bring back the privous valid value`, () => {
      const props = {
        defaultValue: moment('1/25/1982 9:30 AM')
      };
      const driver = createDriver(<TimePicker {...props}/>);
      driver.setValue('blabla');
      driver.blur();
      expect(driver.getValue()).toBe(format12Hours(props.defaultValue));
    });

    it(`should not allow to enter invalid time using keyboard's input, it should bring back the privous valid value`, () => {
      const props = {
        defaultValue: moment('1/25/1982 9:30 AM')
      };
      const driver = createDriver(<TimePicker {...props}/>);
      driver.setValue('99:99');
      driver.blur();
      expect(driver.getValue()).toBe(format12Hours(props.defaultValue));
    });

    it(`should allow toggling between am/pm when in 12 hours mode`, () => {
      const props = {
        defaultValue: moment('1/25/1982 9:30 PM'),
        disableAmPm: false
      };
      const driver = createDriver(<TimePicker {...props}/>);
      expect(driver.getAmPmIndicatorText()).toBe('pm');
      driver.toggleAmPmIndicator();
      expect(driver.getAmPmIndicatorText()).toBe('am');
    });
  });

  describe('Styling', () => {
    it(`should not be created in rtl mode by default`, () => {
      const props = {
      };
      const driver = createDriver(<TimePicker {...props}/>);
      expect(driver.isRtl()).toBeFalsy();
    });

    it(`should allow to be created in rtl mode`, () => {
      const props = {
        rtl: true
      };
      const driver = createDriver(<TimePicker {...props}/>);
      expect(driver.isRtl()).toBeTruthy();
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<TimePicker/>, timeInputTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<TimePicker/>, enzymeTimeInputTestkitFactory)).toBe(true);
    });
  });
});
