import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import checkboxDriverFactory from './Checkbox.driver';
import {createDriverFactory} from '../test-common';
import {checkboxTestkitFactory} from '../../testkit';
import Checkbox from './Checkbox';
import {checkboxTestkitFactory as enzymeCheckboxTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Checkbox', () => {
  const createDriver = createDriverFactory(checkboxDriverFactory);

  it('should be unchecked and not disabled by default', () => {
    const driver = createDriver(<Checkbox/>);
    expect(driver.isChecked()).toBeFalsy();
    expect(driver.isDisabled()).toBeFalsy();
  });

  it('should be checked', () => {
    const driver = createDriver(<Checkbox checked/>);
    expect(driver.isChecked()).toBeTruthy();
  });

  it('should be disabled', () => {
    const driver = createDriver(<Checkbox disabled/>);
    expect(driver.isDisabled()).toBeTruthy();
  });

  it('should have an error state', () => {
    const driver = createDriver(<Checkbox hasError/>);
    expect(driver.hasError()).toBeTruthy();
  });

  it('should have a label', () => {
    const driver = createDriver(<Checkbox disabled>Hey</Checkbox>);
    expect(driver.getLabel()).toBe('Hey');
  });

  it('should call onChange when clicking the Checkbox', () => {
    const onChange = jest.fn();

    const driver = createDriver(<Checkbox onChange={onChange}/>);

    driver.click();
    expect(onChange).toBeCalled();
  });

  it('should not call onChange when clicking disabled Checkbox', () => {
    const onChange = jest.fn();

    const driver = createDriver(<Checkbox onChange={onChange} disabled/>);

    driver.click();
    expect(onChange).not.toBeCalled();
  });

  it('should not run in indeterminate mode when not specified', () => {
    const driver = createDriver(<Checkbox/>);

    expect(driver.isIndeterminate()).toBeFalsy();
  });

  it('should run in indeterminate mode when specified', () => {
    const driver = createDriver(<Checkbox indeterminate/>);

    expect(driver.isIndeterminate()).toBeTruthy();
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Checkbox dataHook={dataHook}/></div>));
      const checkboxTestkit = checkboxTestkitFactory({wrapper, dataHook});
      expect(checkboxTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Checkbox dataHook={dataHook}/>);
      const checkboxTestkit = enzymeCheckboxTestkitFactory({wrapper, dataHook});
      expect(checkboxTestkit.exists()).toBeTruthy();
    });
  });
});
