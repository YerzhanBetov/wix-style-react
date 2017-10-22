import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import multiSelectDriverFactory from './MultiSelect.driver';
import MultiSelect from './MultiSelect';
import {createDriverFactory} from '../test-common';
import {multiSelectTestkitFactory} from '../../testkit';
import {multiSelectTestkitFactory as enzymeMultiSelectTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import {runInputWithOptionsTest} from '../InputWithOptions/InputWithOptions.spec';

runInputWithOptionsTest(multiSelectDriverFactory);

describe('multiSelect', () => {

  const createDriver = createDriverFactory(multiSelectDriverFactory);
  const options = [
    {value: 'Alabama', id: 'Alabama', tag: {label: 'Alabama'}},
    {value: 'Alaska', id: 'Alaska'},
    {value: 'Arkansas', id: 'Arkansas', tag: {label: 'Arkansas'}},
    {value: 'Arkansas', id: 'Arkansas'},
    {value: 'California', id: 'California'},
    {value: 'California2', id: 'California2'},
    {value: 'California3', id: 'California3'},
    {value: 'California4', id: 'California4'},
    {value: 'California5', id: 'California5'},
    {value: 'California6', id: 'California6'},
    {value: 'California7', id: 'California7'},
    {value: 'Two words', id: 'Two words'}
  ];

  it('should show dropdown when autofocus is on', () => {
    const {inputDriver, dropdownLayoutDriver} = createDriver(<MultiSelect options={options} autoFocus/>);
    expect(inputDriver.isFocus()).toBeTruthy();
    expect(dropdownLayoutDriver.isShown()).toBeTruthy();
  });

  it('should remove options that were selected and became tags', () => {
    const tags = [{id: 'Alabama', label: 'Alabama'}];

    const {driver, dropdownLayoutDriver} = createDriver(<MultiSelect options={options} autoFocus/>);
    expect(dropdownLayoutDriver.optionsLength()).toBe(options.length);
    expect(dropdownLayoutDriver.isOptionExists('Alabama')).toBeTruthy();

    driver.setProps({options, tags});
    expect(dropdownLayoutDriver.optionsLength()).toBe(options.length - tags.length);
    expect(dropdownLayoutDriver.isOptionExists('Alabama')).toBeFalsy();
  });

  it('should not filter anything without predicate function', () => {
    const onSelect = jest.fn();
    const {driver, dropdownLayoutDriver} = createDriver(<MultiSelect options={options} onSelect={onSelect}/>);
    driver.focus();
    expect(dropdownLayoutDriver.optionsLength()).toBe(options.length);
  });

  it('should not loose Focus or close the list on selection with a mouse click', () => {
    const {driver, inputDriver, dropdownLayoutDriver} = createDriver(<MultiSelect options={options}/>);
    driver.focus();
    dropdownLayoutDriver.clickAtOption(0);
    expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    expect(inputDriver.isFocus());
  });

  it('should not loose Focus or close the list on selection with enter press', () => {
    const {driver, inputDriver, dropdownLayoutDriver} = createDriver(<MultiSelect options={options}/>);
    driver.focus();
    driver.pressDownKey();
    driver.pressEnterKey();
    expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    expect(inputDriver.isFocus()).toBeTruthy();
  });

  it('should not loose Focus or close the list on selection with tab press', () => {
    const onSelect = jest.fn();
    const {driver, inputDriver, dropdownLayoutDriver} = createDriver(<MultiSelect options={options} onSelect={onSelect}/>);
    driver.focus();
    driver.pressDownKey();
    driver.pressTabKey();
    expect(onSelect).toBeCalledWith([{id: options[0].id, label: options[0].value}]);
    expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    expect(inputDriver.isFocus()).toBeTruthy();
  });

  it('should not loose Focus or close the list on selection with comma press', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();
    const {driver, inputDriver, dropdownLayoutDriver} = createDriver(
      <MultiSelect value={options[0].value} options={options} delimiters={[',']} onSelect={onSelect} onChange={onChange}/>
    );
    driver.focus();
    inputDriver.trigger('keyDown', {key: ','});
    expect(onSelect).toBeCalledWith([{id: options[0].id, label: options[0].value}]);
    expect(onChange).toBeCalledWith({target: {value: ''}});
    expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    expect(inputDriver.isFocus()).toBeTruthy();
  });

  it('should support custom delimiters', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();
    const {driver, inputDriver, dropdownLayoutDriver} = createDriver(
      <MultiSelect value={options[0].value} options={options} delimiters={[';']} onSelect={onSelect} onChange={onChange}/>
    );
    driver.focus();
    inputDriver.trigger('keyDown', {key: ';'});
    expect(onSelect).toBeCalledWith([{id: options[0].id, label: options[0].value}]);
    expect(onChange).toBeCalledWith({target: {value: ''}});
    expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    expect(inputDriver.isFocus()).toBeTruthy();
  });

  it('should display a placeholder if there are no tags', () => {
    const placeholder = 'myPlaceholder';
    const {inputDriver} = createDriver(<MultiSelect options={options} placeholder={placeholder}/>);
    expect(inputDriver.getPlaceholder()).toBe(placeholder);
  });

  it('should not display a placeholder if there are any tags', () => {
    const tags = [{id: 'Alabama', label: 'Alabama'}];
    const placeholder = 'myPlaceholder';
    const {inputDriver} = createDriver(<MultiSelect options={options} tags={tags} placeholder={placeholder}/>);
    expect(inputDriver.getPlaceholder()).toBe('');
  });

  it('should focus the input when clicking on the input wrapper', () => {
    const {driver, inputDriver} = createDriver(<MultiSelect options={options}/>);
    expect(inputDriver.isFocus()).toBeFalsy();
    driver.clickOnInputWrapper();
    expect(inputDriver.isFocus()).toBeTruthy();
  });

  it('should check that wrapper has focus when the input element does', () => {
    const {driver, inputDriver} = createDriver(<MultiSelect options={options}/>);
    driver.clickOnInputWrapper();
    expect(inputDriver.isFocus()).toBeTruthy();
    expect(driver.inputWrapperHasFocus()).toBeTruthy();
  });

  it('should contain specific tags', () => {
    const tags = [{id: 'Alabama', label: 'Alabama'}, {id: 'Alaska', label: 'Alaska'}];

    const {driver} = createDriver(<MultiSelect options={options} tags={tags}/>);
    expect(driver.numberOfTags()).toBe(tags.length);
    expect(driver.getTagLabelAt(0)).toBe('Alabama');
    expect(driver.getTagLabelAt(1)).toBe('Alaska');
  });

  it('should support pasting legal multiple tags', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();
    const {driver, inputDriver} = createDriver(
      <MultiSelect options={options} onSelect={onSelect} onChange={onChange}/>
    );
    driver.focus();
    inputDriver.trigger('paste');
    inputDriver.enterText(`${options[0].value}, ${options[2].value}`);
    expect(onChange).toBeCalledWith({target: {value: ''}});
    expect(onSelect).toBeCalledWith([
      {id: options[0].id, label: options[0].value},
      {id: options[2].id, label: options[2].value}
    ]);
  });

  it('should support pasting illegal multiple tags with error theme', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();
    const {driver, inputDriver} = createDriver(
      <MultiSelect options={options} onSelect={onSelect} onChange={onChange}/>
    );
    driver.focus();
    inputDriver.trigger('paste');
    inputDriver.enterText(`${options[0].value}, Arkansa`);
    expect(onChange).toBeCalledWith({target: {value: ''}});
    expect(onSelect).toBeCalledWith([
      {id: options[0].id, label: options[0].value},
      {id: 'customOption_2', label: 'Arkansa', theme: 'error'}
    ]);
  });

  it('should call onManuallyInput after delimiter is pressed and input is not empty', () => {
    const onManuallyInput = jest.fn();
    const {driver, inputDriver} = createDriver(<MultiSelect options={options} onManuallyInput={onManuallyInput} value="custom value"/>);

    driver.focus();
    inputDriver.enterText('custom value');
    driver.pressCommaKey();

    expect(onManuallyInput).toHaveBeenCalled();
    expect(onManuallyInput.mock.calls[0][0]).toBe('custom value');
  });

  it('should call onRemoveTag when removing tags', () => {
    const tagId = 'SweetHome';
    const tags = [{id: tagId, label: 'Alabama'}];
    const onRemoveTag = jest.fn();
    const {driver} = createDriver(<MultiSelect autoFocus tags={tags} onRemoveTag={onRemoveTag}/>);

    const tagDriver = driver.getTagDriverByTagId(tagId);
    tagDriver.removeTag();

    expect(onRemoveTag).toHaveBeenCalledWith(tagId);
  });

  it('should set maxHeight to initial when no height limit introduced', () => {
    const {driver} = createDriver(<MultiSelect options={options}/>);

    expect(driver.getMaxHeight()).toBe('initial');
  });

  it('should set maxHeight when maxNumRows defined', () => {
    const {driver} = createDriver(<MultiSelect maxNumRows={2} options={options}/>);

    expect(driver.getMaxHeight()).toBe('72px');
  });

  it('should set maxHeight when maxNumRows defined (large tags)', () => {
    const options = [
      {value: 'Alaska', id: 'Alaska', label: 'Alaska', size: 'large'}
    ];

    const {driver} = createDriver(<MultiSelect maxNumRows={2} tags={options} options={options}/>);

    expect(driver.getMaxHeight()).toBe('96px');
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const tags = [{id: 'Alabama', label: 'Alabama'}];
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><MultiSelect dataHook={dataHook} tags={tags}/></div>));
      const multiSelectTestkit = multiSelectTestkitFactory({wrapper, dataHook});
      expect(multiSelectTestkit.driver.exists()).toBeTruthy();
      expect(multiSelectTestkit.inputDriver.exists()).toBeTruthy();
      expect(multiSelectTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
      expect(multiSelectTestkit.driver.getTagDriverByTagId('Alabama').exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const tags = [{id: 'Alabama', label: 'Alabama'}];
      const wrapper = mount(<MultiSelect dataHook={dataHook} tags={tags}/>);
      const multiSelectTestkit = enzymeMultiSelectTestkitFactory({wrapper, dataHook});
      expect(multiSelectTestkit.driver.exists()).toBeTruthy();
      expect(multiSelectTestkit.inputDriver.exists()).toBeTruthy();
      expect(multiSelectTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
      expect(multiSelectTestkit.driver.getTagDriverByTagId('Alabama').exists()).toBeTruthy();
    });
  });
});
