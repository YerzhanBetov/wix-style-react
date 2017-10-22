import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import collapsedHeaderDriverFactory from './CollapsedHeader.driver';
import {createDriverFactory} from '../../test-common';
import CollapsedHeader from './CollapsedHeader';
import {collapsedHeaderTestkitFactory} from '../../../testkit';
import {collapsedHeaderTestkitFactory as enzymeCollapsedHeaderTestkitFactory} from '../../../testkit/enzyme';
import {mount} from 'enzyme';

describe('CollpasedHeader', () => {
  const createDriver = createDriverFactory(collapsedHeaderDriverFactory);

  it('should have a title', () => {
    const driver = createDriver(<CollapsedHeader title="Header Title"><div/></CollapsedHeader>);
    expect(driver.title()).toBe('Header Title');
  });

  it('should have a subtitle', () => {
    const driver = createDriver(<CollapsedHeader title="Header Title" subtitle="Header Subtitle"><div/></CollapsedHeader>);
    expect(driver.subtitle()).toBe('Header Subtitle');
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><CollapsedHeader title="Header Title" subtitle="Header Subtitle" dataHook={dataHook}><div/></CollapsedHeader></div>));
      const collapsedHeaderTestkit = collapsedHeaderTestkitFactory({wrapper, dataHook});
      expect(collapsedHeaderTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<CollapsedHeader title="Header Title" subtitle="Header Subtitle" dataHook={dataHook}><div/></CollapsedHeader>);
      const collapsedDriverTestkit = enzymeCollapsedHeaderTestkitFactory({wrapper, dataHook});
      expect(collapsedDriverTestkit.exists()).toBeTruthy();
    });
  });
});
