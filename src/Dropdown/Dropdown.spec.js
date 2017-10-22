import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import dropdownDriverFactory from './Dropdown.driver';
import Dropdown from './Dropdown';
import {createDriverFactory} from '../test-common';
import {dropdownTestkitFactory} from '../../testkit';
import {dropdownTestkitFactory as enzymeDropdownTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import {runInputWithOptionsTest} from '../InputWithOptions/InputWithOptions.spec';

runInputWithOptionsTest(dropdownDriverFactory);

describe('Dropdown', () => {

  const createDriver = createDriverFactory(dropdownDriverFactory);

  const getOptions = () => [
    {id: 0, value: 'Option 1'},
    {id: 1, value: 'Option 2'},
    {id: 2, value: 'Option 3', disabled: true},
    {id: 3, value: 'Option 4'},
    {id: 'divider1', value: '-'},
    {id: 'element1', value: <span style={{color: 'brown'}}>Option 4</span>}
  ];

  it('should select item with selectedId on init state', () => {
    const {inputDriver, dropdownLayoutDriver} = createDriver(<Dropdown options={getOptions()} selectedId={0}/>);

    expect(dropdownLayoutDriver.isOptionSelected(0)).toBeTruthy();
    expect(inputDriver.getValue()).toBe('Option 1');
  });

  it('should select an item when clicked', () => {
    const {driver, dropdownLayoutDriver} = createDriver(<Dropdown options={getOptions()}/>);
    driver.focus();
    dropdownLayoutDriver.clickAtOption(0);
    expect(dropdownLayoutDriver.isOptionSelected(0)).toBeTruthy();
  });

  it('should enter the selected option text when selected', () => {
    const {driver, inputDriver, dropdownLayoutDriver} = createDriver(<Dropdown options={getOptions()}/>);
    driver.focus();
    dropdownLayoutDriver.clickAtOption(0);
    expect(inputDriver.getValue()).toBe('Option 1');
  });

  it('should update text when selected option changes', () => {
    const options = getOptions();
    const {driver, inputDriver, dropdownLayoutDriver} = createDriver(<Dropdown options={options} selectedId={0}/>);
    driver.focus();
    dropdownLayoutDriver.clickAtOption(0);
    expect(inputDriver.getValue()).toBe('Option 1');
    options[0].value = 'Updated';
    driver.setProps({options, selectedId: 0});
    expect(inputDriver.getValue()).toBe('Updated');
  });

  it('should be read only', () => {
    const {inputDriver} = createDriver(<Dropdown options={getOptions()}/>);
    expect(inputDriver.getReadOnly()).toBeTruthy();
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Dropdown dataHook={dataHook}/></div>));
      const dropdownTestkit = dropdownTestkitFactory({wrapper, dataHook});
      expect(dropdownTestkit.driver.exists()).toBeTruthy();
      expect(dropdownTestkit.inputDriver.exists()).toBeTruthy();
      expect(dropdownTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Dropdown dataHook={dataHook}/>);
      const dropdownTestkit = enzymeDropdownTestkitFactory({wrapper, dataHook});
      expect(dropdownTestkit.driver.exists()).toBeTruthy();
      expect(dropdownTestkit.inputDriver.exists()).toBeTruthy();
      expect(dropdownTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
    });
  });
});
