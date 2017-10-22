import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import inputWithOptionsDriverFactory from './InputWithOptions.driver';
import InputWithOptions from './InputWithOptions';
import {createDriverFactory} from '../test-common';
import {inputWithOptionsTestkitFactory} from '../../testkit';
import {inputWithOptionsTestkitFactory as enzymeInputWithOptionsTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

const runInputWithOptionsTest = driverFactory => {
  describe('InputWithOptions', () => {

    const createDriver = createDriverFactory(driverFactory);
    const options = [
      {id: 0, value: 'Option 1'},
      {id: 1, value: 'Option 2'},
      {id: 2, value: 'Option 3', disabled: true},
      {id: 3, value: 'Option 4'},
      {id: 'divider1', value: '-'},
      {id: 'element1', value: <span style={{color: 'brown'}}>Option 4</span>}
    ];

    it('should show dropdown when autofocus is on', () => {
      const {inputDriver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options} autoFocus/>);
      expect(inputDriver.isFocus()).toBeTruthy();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should have an Input and an hidden DropdownLayout', () => {
      const {inputDriver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options}/>);
      expect(inputDriver.exists()).toBeTruthy();
      expect(dropdownLayoutDriver.exists()).toBeTruthy();
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
    });

    it('should show DropdownLayout when input get focused', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options}/>);
      driver.focus();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should show DropdownLayout on any key press', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options}/>);
      driver.pressAnyKey();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should show DropdownLayout on down key', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options}/>);
      driver.pressUpKey();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should show DropdownLayout on up key', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options}/>);
      driver.pressDownKey();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should hide DropdownLayout on enter and esc key press', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options}/>);
      driver.focus();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
      driver.pressEnterKey();
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
      driver.pressUpKey();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
      driver.pressEscKey();
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
    });

    it('should start keyboard navigation from last selected option when re-opening the dropdown layout', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options} selectedId={1}/>);
      driver.focus();

      dropdownLayoutDriver.clickAtOption(1);
      driver.outsideClick();
      driver.focus();

      expect(dropdownLayoutDriver.isOptionSelected(1)).toBeTruthy();
      expect(dropdownLayoutDriver.isOptionHovered(1)).toBeTruthy();

      driver.pressDownKey(); // going to skip disabled option at index 2
      expect(dropdownLayoutDriver.isOptionHovered(3)).toBeTruthy();
    });

    it('should call onManuallyInput on enter key press with a trimed value', () => {
      const onManuallyInput = jest.fn();
      const {driver, inputDriver} = createDriver(<InputWithOptions options={options} onManuallyInput={onManuallyInput}/>);
      inputDriver.enterText('my text      ');
      driver.pressEnterKey();
      expect(onManuallyInput).toBeCalledWith('my text', undefined);
    });

    it('should call onManuallyInput on enter key press', () => {
      const onManuallyInput = jest.fn();
      const {driver, inputDriver} = createDriver(<InputWithOptions options={options} onManuallyInput={onManuallyInput}/>);
      inputDriver.enterText('my text');
      driver.pressEnterKey();
      expect(onManuallyInput).toBeCalledWith('my text', undefined);
    });

    it('should call onManuallyInput on tab key press', () => {
      const onManuallyInput = jest.fn();
      const {driver, inputDriver} = createDriver(<InputWithOptions options={options} onManuallyInput={onManuallyInput}/>);
      inputDriver.enterText('my text');
      driver.pressTabKey();
      expect(onManuallyInput).toBeCalledWith('my text', undefined);
    });

    it('should blur on tab key press', () => {
      const onManuallyInput = jest.fn();
      const {driver, inputDriver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options} onManuallyInput={onManuallyInput}/>);
      inputDriver.focus();
      inputDriver.enterText('Option 1');
      driver.pressDownKey();
      expect(inputDriver.isFocus()).toBe(true);
      driver.pressTabKey();
      expect(inputDriver.isFocus()).toBe(false);
      expect(dropdownLayoutDriver.isShown()).toBe(false);
    });

    it('should stay focused on tab key press with closeOnSelect=false', () => {
      const onManuallyInput = jest.fn();
      const {driver, inputDriver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options} onManuallyInput={onManuallyInput} closeOnSelect={false}/>);
      inputDriver.focus();
      inputDriver.enterText('Option 1');
      driver.pressDownKey();
      expect(inputDriver.isFocus()).toBe(true);
      driver.pressTabKey();
      expect(inputDriver.isFocus()).toBe(true);
      expect(dropdownLayoutDriver.isShown()).toBe(true);
    });

    it('should suggest an option when calling onManuallyInput', () => {
      const onManuallyInput = jest.fn();
      const {driver, inputDriver} = createDriver(<InputWithOptions options={options} onManuallyInput={onManuallyInput}/>);
      inputDriver.enterText('Option 2');
      driver.pressEnterKey();
      expect(onManuallyInput).toBeCalledWith('Option 2', {id: 1, value: 'Option 2'});
    });

    it('should hide options on selection by default', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options}/>);
      driver.focus();
      dropdownLayoutDriver.clickAtOption(0);
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
    });

    it('should hide options on outside click', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options}/>);
      driver.outsideClick();
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
    });

    it('should not hide options on selection', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options} closeOnSelect={false}/>);
      driver.focus();
      dropdownLayoutDriver.clickAtOption(0);
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should call onSelect when an option is pressed', () => {
      const onSelect = jest.fn();
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options} onSelect={onSelect}/>);
      driver.focus();
      dropdownLayoutDriver.clickAtOption(0);
      expect(onSelect).toBeCalledWith(options[0]);
    });

    it('should not call onSelect when a selected option is pressed', () => {
      const onSelect = jest.fn();
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options} onSelect={onSelect} selectedId={options[0].id}/>);
      driver.focus();
      dropdownLayoutDriver.clickAtOption(0);
      expect(onSelect).not.toBeCalled();
    });

    it('should call onFocus', () => {
      const onFocus = jest.fn();
      const {driver} = createDriver(<InputWithOptions options={options} onFocus={onFocus}/>);
      driver.focus();
      expect(onFocus).toBeCalled();
    });

    it('should call onBlur if clicked outside and input is focused', () => {
      const onBlur = jest.fn();
      const {driver, inputDriver} = createDriver(<InputWithOptions options={options} onBlur={onBlur}/>);
      driver.outsideClick();
      expect(onBlur).not.toBeCalled();
      driver.focus();
      driver.outsideClick();
      inputDriver.blur(); // apparently, jsdom does not fire onBlur after input.blur() is called
      expect(onBlur).toBeCalled();
    });

    it('should not call onManuallyInput when composing text via external means', () => {
      const onManualInput = jest.fn();
      const {driver, inputDriver} = createDriver(<InputWithOptions options={options} onManuallyInput={onManualInput}/>);
      inputDriver.startComposing();
      driver.pressEnterKey();
      expect(onManualInput).not.toBeCalled();
      inputDriver.endComposing();
      driver.pressEnterKey();
      expect(onManualInput).toBeCalled();
    });

    describe('testkit', () => {
      it('should exist', () => {
        const div = document.createElement('div');
        const dataHook = 'myDataHook';
        const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><InputWithOptions dataHook={dataHook}/></div>));
        const inputWithOptionsTestkit = inputWithOptionsTestkitFactory({wrapper, dataHook});
        expect(inputWithOptionsTestkit.driver.exists()).toBeTruthy();
        expect(inputWithOptionsTestkit.inputDriver.exists()).toBeTruthy();
        expect(inputWithOptionsTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
      });
    });

    describe('enzyme testkit', () => {
      it('should exist', () => {
        const dataHook = 'myDataHook';
        const wrapper = mount(<InputWithOptions dataHook={dataHook}/>);
        const inputWithOptionsTestkit = enzymeInputWithOptionsTestkitFactory({wrapper, dataHook});
        expect(inputWithOptionsTestkit.driver.exists()).toBeTruthy();
        expect(inputWithOptionsTestkit.inputDriver.exists()).toBeTruthy();
        expect(inputWithOptionsTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
      });
    });

    describe('appearance', () => {
      it('should be possible to specify the theme of underlying elements', () => {
        const props = {theme: 'material', dataHook: 'myDataHook'};
        const wrapper = mount(<InputWithOptions {...props}/>);
        const testkit = enzymeInputWithOptionsTestkitFactory({wrapper, dataHook: props.dataHook});
        expect(testkit.inputDriver.isOfStyle(props.theme)).toBe(true);
        expect(testkit.dropdownLayoutDriver.hasTheme(props.theme)).toBe(true);
      });
    });

  });
};

runInputWithOptionsTest(inputWithOptionsDriverFactory);

export {runInputWithOptionsTest};
