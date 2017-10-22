import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import buttonDriverFactory from './Button.driver';
import Button from './Button';
import {createDriverFactory} from '../../test-common';
import {buttonTestkitFactory} from '../../../testkit';
import {buttonTestkitFactory as enzymeButtonTestkitFactory} from '../../../testkit/enzyme';
import {mount} from 'enzyme';
import {Close} from '../../Icons/dist';

describe('Button', () => {

  const createDriver = createDriverFactory(buttonDriverFactory);

  it('should click a button', () => {
    const onClick = jest.fn();
    const driver = createDriver(<Button onClick={onClick}/>);

    driver.click();
    expect(onClick).toBeCalled();
  });

  it('should not call onClick when disabled', () => {
    const onClick = jest.fn();
    const driver = createDriver(<Button onClick={onClick} disabled/>);

    driver.click();
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('should get disabled class', () => {
    const driver = createDriver(<Button disabled/>);

    expect(driver.isButtonDisabled()).toBe(true);
  });

  it('should render children', () => {
    const children = '<div>123</div>';
    const driver = createDriver(<Button>{children}</Button>);

    expect(driver.getButtonTextContent()).toBe(children);
  });

  it('should have a prefixIcon', () => {
    const driver = createDriver(<Button prefixIcon={<Close/>}/>);

    expect(driver.isSuffixIconExists()).toBeFalsy();
    expect(driver.isPrefixIconExists()).toBeTruthy();
  });

  it('should have a suffixIcon', () => {
    const driver = createDriver(<Button suffixIcon={<Close/>}/>);

    expect(driver.isPrefixIconExists()).toBeFalsy();
    expect(driver.isSuffixIconExists()).toBeTruthy();
  });
});

describe('testkit', () => {
  it('should exist', () => {
    const div = document.createElement('div');
    const dataHook = 'myDataHook';
    const onClick = jest.fn();
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Button onClick={onClick} dataHook={dataHook}/></div>));
    const buttonTestkit = buttonTestkitFactory({wrapper, dataHook});
    expect(buttonTestkit.exists()).toBeTruthy();
  });
});

describe('enzyme testkit', () => {
  it('should exist', () => {
    const dataHook = 'myDataHook';
    const onClick = jest.fn();
    const wrapper = mount(<Button onClick={onClick} dataHook={dataHook}/>);
    const buttonTestkit = enzymeButtonTestkitFactory({wrapper, dataHook});
    expect(buttonTestkit.exists()).toBeTruthy();
  });
});
