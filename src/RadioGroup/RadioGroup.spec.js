import React from 'react';
import RadioGroup from './RadioGroup';
import radioGroupDriverFactory from './RadioGroup.driver';
import {createDriverFactory} from '../test-common';
import {radioGroupTestkitFactory} from '../../testkit';
import {isTestkitExists, isEnzymeTestkitExists} from '../../testkit/test-common';
import {radioGroupTestkitFactory as enzymeRadioGroupTestkitFactory} from '../../testkit/enzyme';

describe('RadioGroup', () => {
  const createDriver = createDriverFactory(radioGroupDriverFactory);

  const elementToRender = props => (
    <RadioGroup {...props}>
      <RadioGroup.Radio value={1}>Option 1</RadioGroup.Radio>
      <RadioGroup.Radio value={2}>Option 2</RadioGroup.Radio>
      <RadioGroup.Radio value={3}>Option 3</RadioGroup.Radio>
      <RadioGroup.Radio value={4}>Option 4</RadioGroup.Radio>
    </RadioGroup>
  );

  it('should have the correct radio buttons', () => {
    const driver = createDriver(elementToRender());
    expect(driver.getNumberOfRadios()).toBe(4);
    expect(driver.getRadioValueAt(0)).toBe('1');
  });

  it('should check the option that matches the initial value', () => {
    const value = 2;
    const driver = createDriver(elementToRender({value}));
    expect(driver.getSelectedValue()).toBe(value.toString());
  });

  it('should not check any options if value was not matched', () => {
    const value = 10;
    const driver = createDriver(elementToRender({value}));
    expect(driver.getSelectedValue()).toBe(null);
  });

  describe('onChange attribute', () => {
    it('should be called with the correct option value', () => {
      const onChange = jest.fn();
      const driver = createDriver(elementToRender({onChange}));
      driver.selectByValue(1);
      expect(onChange).toBeCalledWith(1);
    });

    it('should not be called upon checked option', () => {
      const value = 1;
      const onChange = jest.fn();
      const driver = createDriver(elementToRender({onChange, value}));

      driver.selectByValue(1);
      expect(onChange.mock.calls.length).toBe(0);
    });

    it('should not be called upon disabled option', () => {
      const disabledRadios = [1];
      const onChange = jest.fn();
      const driver = createDriver(elementToRender({onChange, disabledRadios}));

      driver.selectByValue(1);
      expect(onChange.mock.calls.length).toBe(0);
    });
  });

  describe('vAlign attribute', () => {
    const elementToRender = props => (
      <RadioGroup {...props}>
        <RadioGroup.Radio value={1}>Option 1</RadioGroup.Radio>
        <RadioGroup.Radio value={2}>Option 2</RadioGroup.Radio>
      </RadioGroup>
    );

    it('should have a default vcenter class', () => {
      const driver = createDriver(elementToRender());
      expect(driver.getClassOfLabelAt(0)).toBe('vcenter t1_1');
      expect(driver.getClassOfLabelAt(1)).toBe('vcenter t1_1');
    });

    it('should have a vtop class', () => {
      const driver = createDriver(elementToRender({vAlign: 'top'}));
      expect(driver.getClassOfLabelAt(0)).toBe('vtop t1_1');
      expect(driver.getClassOfLabelAt(1)).toBe('vtop t1_1');
    });
  });

  describe('display attribute', () => {
    it('should be vertical by default', () => {
      const driver = createDriver(elementToRender());
      expect(driver.isVerticalDisplay()).toBe(true);
    });

    it('should be horizontal', () => {
      const driver = createDriver(elementToRender({display: 'horizontal'}));
      expect(driver.isHorizontalDisplay()).toBe(true);
    });
  });

  describe('spacing attribute', () => {
    it('should be 12px by default', () => {
      const driver = createDriver(elementToRender());
      expect(driver.spacing()).toBe('12px');
    });

    it('should be spaced', () => {
      const driver = createDriver(elementToRender({spacing: '30px'}));
      expect(driver.spacing()).toBe('30px');
    });
  });

  describe('line-height attribute', () => {
    it('should be 24px', () => {
      const driver = createDriver(elementToRender());
      expect(driver.lineHeight()).toBe('24px');
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<RadioGroup/>, radioGroupTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<RadioGroup/>, enzymeRadioGroupTestkitFactory)).toBe(true);
    });
  });
});
