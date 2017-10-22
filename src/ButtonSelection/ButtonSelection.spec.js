import React from 'react';
import buttonSelectionDriverFactory from './ButtonSelection.driver';
import {createDriverFactory} from '../test-common';
import {buttonSelectionTestkitFactory} from '../../testkit';
import {buttonSelectionTestkitFactory as enzymeButtonSelectionTestkitFactory} from '../../testkit/enzyme';
import ButtonSelection from './ButtonSelection';
import ReactTestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';

describe('ButtonSelection', () => {
  const createDriver = createDriverFactory(buttonSelectionDriverFactory);

  const buttonsNames = ['A', 'B', 'C'];
  const onChange = jest.fn();

  it('should create three buttons with given names', () => {
    const props = {
      buttonsNames,
      onChange
    };

    const driver = createDriver(<ButtonSelection {...props}/>);
    expect(driver.getButtonsNames()).toEqual(props.buttonsNames);
    expect(driver.getButtonsClasses()).toEqual(Array(3).fill('unselected'));
  });

  it('should select initial value', () => {
    const props = {
      buttonsNames,
      onChange,
      value: 'A'
    };

    const driver = createDriver(<ButtonSelection {...props}/>);
    expect(driver.getSelectedButton()).toBe(props.value);
  });

  it('should select value', () => {
    const props = {
      buttonsNames,
      onChange
    };

    const driver = createDriver(<ButtonSelection {...props}/>);
    driver.selectByValue('B');

    expect(props.onChange).toBeCalledWith('B');
  });

  it('should call onChange when selecting a value that is different from the selected value', () => {
    const props = {
      buttonsNames,
      onChange,
      value: 'A'
    };

    const driver = createDriver(<ButtonSelection {...props}/>);
    driver.selectByValue('B');

    expect(onChange.mock.calls.length).toBeGreaterThan(0);
  });

  it('should not call onChange when reselecting the selected value', () => {
    const onChange = jest.fn();
    const props = {
      buttonsNames,
      onChange,
      value: 'A'
    };

    const driver = createDriver(<ButtonSelection {...props}/>);
    driver.selectByValue('A');

    expect(onChange.mock.calls.length).toBe(0);
  });

  it('should throw exception for unkown value', () => {
    const props = {
      buttonsNames,
      onChange,
      value: 'unknown value'
    };

    expect(() => createDriver(<ButtonSelection {...props}/>)).toThrowError();
  });

  it('should update buttons names', () => {
    const props = {
      buttonsNames,
      onChange
    };

    const driver = createDriver(<ButtonSelection {...props}/>);
    props.buttonsNames = ['DD', 'EE'];
    driver.setProps(props);

    expect(driver.getButtonsNames()).toEqual(props.buttonsNames);
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><ButtonSelection buttonsNames={buttonsNames} onChange={onChange} dataHook={dataHook}/></div>));
      const buttonSelectionTestkit = buttonSelectionTestkitFactory({wrapper, dataHook});
      expect(buttonSelectionTestkit.exists()).toBeTruthy();
      expect(buttonSelectionTestkit.getButtonsNames()).toEqual(buttonsNames);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<ButtonSelection buttonsNames={buttonsNames} dataHook={dataHook} onChange={onChange}/>);
      const buttonSelectionTestkit = enzymeButtonSelectionTestkitFactory({wrapper, dataHook});
      expect(buttonSelectionTestkit.exists()).toBeTruthy();
      expect(buttonSelectionTestkit.getButtonsNames()).toEqual(buttonsNames);
    });
  });
});
