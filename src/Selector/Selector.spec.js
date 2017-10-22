import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import selectorDriverFactory from './Selector.driver';
import {createDriverFactory} from '../test-common';
import {selectorTestkitFactory} from '../../testkit';
import Selector from './Selector';
import {selectorTestkitFactory as enzymeSelectorTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Selector', () => {
  const createDriver = createDriverFactory(selectorDriverFactory);

  const defaultProps = {
    id: 1,
    title: 'title'
  };

  it('should be unchecked by default', () => {
    const driver = createDriver(<Selector {...defaultProps}/>);
    expect(driver.isChecked()).toBeFalsy();
  });

  it('should render the title', () => {
    const driver = createDriver(<Selector {...defaultProps}/>);
    expect(driver.getTitle()).toBe(defaultProps.title);
  });

  it('should not render the sub title by default', () => {
    const driver = createDriver(<Selector {...defaultProps}/>);
    expect(driver.getSubTitle()).toBe('');
  });

  it('should render the sub title', () => {
    const props = {...defaultProps, ...{subTitle: 'sub title'}};
    const driver = createDriver(<Selector {...props}/>);
    expect(driver.getSubTitle()).toBe('sub title');
  });

  it('should render a checkbox toggle by default', () => {
    const driver = createDriver(<Selector {...defaultProps}/>);
    expect(driver.toggleType()).toBe('checkbox');
  });

  it('should render a checkbox toggle', () => {
    const toggleType = 'checkbox';
    const props = {...defaultProps, ...{toggleType}};
    const driver = createDriver(<Selector {...props}/>);
    expect(driver.toggleType()).toBe(toggleType);
  });


  it('should render a radio toggle', () => {
    const toggleType = 'radio';
    const props = {...defaultProps, ...{toggleType}};
    const driver = createDriver(<Selector {...props}/>);
    expect(driver.toggleType()).toBe(toggleType);
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Selector {...defaultProps} dataHook={dataHook}/></div>));
      const checkboxTestkit = selectorTestkitFactory({wrapper, dataHook});
      expect(checkboxTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Selector {...defaultProps} dataHook={dataHook}/>);
      const selectorTestkit = enzymeSelectorTestkitFactory({wrapper, dataHook});
      expect(selectorTestkit.exists()).toBeTruthy();
    });
  });
});
