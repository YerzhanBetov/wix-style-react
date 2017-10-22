import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import FloatingTabs from './FloatingTabs';
import FloatingTabItem from '../FloatingTabItem/FloatingTabItem';
import {tpaFloatingTabsTestkitFactory as floatingTabsTestkitFactory} from '../../../testkit';

describe('FloatingTabs', () => {

  it('should exist', () => {

    const div = document.createElement('div');
    const dataHook = 'myDataHook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <FloatingTabs dataHook={dataHook}>
          <FloatingTabItem id="first">1</FloatingTabItem>
          <FloatingTabItem id="second">2</FloatingTabItem>
        </FloatingTabs>
      </div>
    ));
    const floatingTabsTestkit = floatingTabsTestkitFactory({wrapper, dataHook});
    expect(floatingTabsTestkit.exists()).toBeTruthy();
    expect(floatingTabsTestkit.activeContent()).toEqual('1');
  });

  it('should first button have proper title', () => {
    const div = document.createElement('div');
    const dataHook = 'myDataHook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <FloatingTabs dataHook={dataHook}>
          <FloatingTabItem id="first" title="Tab One">1</FloatingTabItem>
          <FloatingTabItem id="second" title="Tab Two">2</FloatingTabItem>
        </FloatingTabs>
      </div>
    ));
    const floatingTabsTestkit = floatingTabsTestkitFactory({wrapper, dataHook});
    expect(floatingTabsTestkit.isButtonByIdExists('first')).toBe(true);
    expect(floatingTabsTestkit.isButtonByIdExists('second')).toBe(true);
    expect(floatingTabsTestkit.getButtonTextById('first')).toBe('Tab One');
  });

  it('should have active and inactive buttons', () => {
    const div = document.createElement('div');
    const dataHook = 'myDataHook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <FloatingTabs activeId="first" dataHook={dataHook}>
          <FloatingTabItem id="first" title="Tab One">1</FloatingTabItem>
          <FloatingTabItem id="second" title="Tab Two">2</FloatingTabItem>
        </FloatingTabs>
      </div>
    ));
    const floatingTabsTestkit = floatingTabsTestkitFactory({wrapper, dataHook});
    expect(floatingTabsTestkit.isButtonActive('first')).toBe(true);
    expect(floatingTabsTestkit.isButtonActive('second')).toBe(false);
  });

  it('should have default selected tab', () => {
    const div = document.createElement('div');
    const dataHook = 'myDataHook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <FloatingTabs dataHook={dataHook} activeTabClassName="activeClass">
          <FloatingTabItem id="first" title="Tab One">1</FloatingTabItem>
          <FloatingTabItem id="second" title="Tab Two">2</FloatingTabItem>
        </FloatingTabs>
      </div>
    ));
    const floatingTabsTestkit = floatingTabsTestkitFactory({wrapper, dataHook});
    expect(floatingTabsTestkit.isButtonActive('first')).toBe(true);
    expect(floatingTabsTestkit.isButtonActive('second')).toBe(false);

    expect(floatingTabsTestkit.activeContent()).toEqual('1');
  });

  it('should be able to click and select tab', () => {
    const onChangeMock = jest.fn();
    const div = document.createElement('div');
    const dataHook = 'myDataHook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <FloatingTabs dataHook={dataHook} onChange={onChangeMock}>
          <FloatingTabItem id="first" title="Tab One">1</FloatingTabItem>
          <FloatingTabItem id="second" title="Tab Two">2</FloatingTabItem>
        </FloatingTabs>
      </div>
    ));
    const floatingTabsTestkit = floatingTabsTestkitFactory({wrapper, dataHook});
    floatingTabsTestkit.clickButtonById('second');
    expect(onChangeMock).toHaveBeenCalledWith('second');
  });

  it('should put custom class to active tab', () => {
    const div = document.createElement('div');
    const dataHook = 'myDataHook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <FloatingTabs dataHook={dataHook} activeTabClassName="activeClass" activeId="second">
          <FloatingTabItem id="first" title="Tab One">1</FloatingTabItem>
          <FloatingTabItem id="second" title="Tab Two">2</FloatingTabItem>
        </FloatingTabs>
      </div>
    ));
    const floatingTabsTestkit = floatingTabsTestkitFactory({wrapper, dataHook});

    expect(floatingTabsTestkit.isButtonHasClass('second', 'activeClass')).toBe(true);
    expect(floatingTabsTestkit.isButtonHasClass('first', 'activeClass')).toBe(false);
  });
});
