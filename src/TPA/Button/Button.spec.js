import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import buttonDriverFactory from './Button.driver';
import Button from './Button';
import {createDriverFactory} from '../../test-common';
import {tpaButtonTestkitFactory as buttonTestkitFactory} from '../../../testkit';
import {tpaButtonTestkitFactory as enzymeButtonTestkitFactory} from '../../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Button', () => {

  const createDriver = createDriverFactory(buttonDriverFactory);

  it('should click a button', () => {
    const onClick = jest.fn();
    const driver = createDriver(<Button onClick={onClick}/>);
    driver.click();
    expect(onClick).toHaveBeenCalled();
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
      const wrapper = mount(<Button dataHook={dataHook}/>);
      const buttonTestkit = enzymeButtonTestkitFactory({wrapper, dataHook});
      expect(buttonTestkit.exists()).toBeTruthy();
    });

    it('should have clickable properties', () => {
      const dataHook = 'myDataHook';
      const onClick = jest.fn();
      const wrapper = mount(<Button onClick={onClick} dataHook={dataHook}>fdsfds</Button>);
      const buttonTestkit = enzymeButtonTestkitFactory({wrapper, dataHook});
      buttonTestkit.click();
      expect(onClick).toHaveBeenCalled();
    });
  });
});
