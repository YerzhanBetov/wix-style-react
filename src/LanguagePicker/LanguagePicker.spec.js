import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import languagePickerDriverFactory from './LanguagePicker.driver';
import LanguagePicker from './LanguagePicker';
import {createDriverFactory} from '../test-common';
import {languagePickerTestkitFactory} from '../../testkit';
import {languagePickerTestkitFactory as enzymeLanguagePickerTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import sinon from 'sinon';

describe('LanguagePicker', () => {
  const createDriver = createDriverFactory(languagePickerDriverFactory);

  const languagePicker = (props = {}) => (
    <LanguagePicker {...props}>
      <LanguagePicker.Option languageKey="en">English</LanguagePicker.Option>
      <LanguagePicker.Option languageKey="fr">French</LanguagePicker.Option>
    </LanguagePicker>
  );

  it('should have big items height by default', () => {
    const {dropdownLayoutDriver} = createDriver(languagePicker());
    expect(dropdownLayoutDriver.isOptionHeightBig(0)).toBe(true);
  });

  it('should call onSelect prop when language is selected', () => {
    const onSelect = jest.fn();
    const {driver, dropdownLayoutDriver} = createDriver(languagePicker({onSelect}));

    driver.mouseEnter();
    dropdownLayoutDriver.clickAtOption(0);

    expect(onSelect).toBeCalledWith({id: 'en', value: 'English'});
  });

  it('should print console warning for bad children format', () => {
    const badLanguagePicker = (props = {}) => (
      <LanguagePicker {...props}>
        <div languageKey="en">English</div>
        <LanguagePicker.Option languageKey="fr">French</LanguagePicker.Option>
      </LanguagePicker>
    );

    const stub = sinon.stub(console, 'error');

    createDriver(badLanguagePicker());

    expect(stub.calledWithMatch(`Invalid Prop children was given. Validation failed on child number 0`)).toBeTruthy();
  });

  it('should have a divider between every language', () => {
    const {dropdownLayoutDriver} = createDriver(languagePicker());
    expect(dropdownLayoutDriver.optionsLength()).toBe(3);
    expect(dropdownLayoutDriver.isOptionADivider(1)).toBe(true);
  });

  it('should not display the selected language in the dropdown', () => {
    const {dropdownLayoutDriver} = createDriver(languagePicker({selectedId: 'en'}));
    expect(dropdownLayoutDriver.optionsLength()).toBe(1);
    expect(dropdownLayoutDriver.optionContentAt(0)).toBe('French');
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div>{languagePicker({dataHook})}</div>));
      const languagePickerTestkit = languagePickerTestkitFactory({wrapper, dataHook});
      expect(languagePickerTestkit.driver.exists()).toBeTruthy();
      expect(languagePickerTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(languagePicker({dataHook}));
      const languagePickerTestkit = enzymeLanguagePickerTestkitFactory({wrapper, dataHook});
      expect(languagePickerTestkit.driver.exists()).toBeTruthy();
      expect(languagePickerTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
    });
  });
});
