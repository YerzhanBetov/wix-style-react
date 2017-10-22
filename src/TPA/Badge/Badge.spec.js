import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Badge from './Badge';
import {tpaBadgeTestkitFactory as badgeTestkitFactory} from '../../../testkit';

describe('Badge', () => {

  it('should render a badge', () => {
    const div = document.createElement('div');
    const dataHook = 'badge-hook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div><Badge dataHook={dataHook}>Hi</Badge></div>
    ));
    const badgeTestkit = badgeTestkitFactory({wrapper, dataHook});
    expect(badgeTestkit.text()).toEqual('Hi');
  });

  it('should allow specifying a alignment', () => {
    const div = document.createElement('div');
    const dataHook = 'badge-hook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div><Badge alignment="top" dataHook={dataHook}>Hi</Badge></div>
    ));
    const badgeTestkit = badgeTestkitFactory({wrapper, dataHook});
    expect(badgeTestkit.hasClass('top')).toBeTruthy();
  });

  describe('should be able to apply the default/base css classes', () => {
    it('primary top', () => {
      const div = document.createElement('div');
      const dataHook = 'badge-hook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div><Badge type="primary" alignment="top" dataHook={dataHook}>Hi</Badge></div>
      ));
      const badgeTestkit = badgeTestkitFactory({wrapper, dataHook});
      expect(badgeTestkit.isOfType('primary')).toBeTruthy();
      expect(badgeTestkit.isOfType('top')).toBeTruthy();
    });
    it('warning bottom', () => {
      const div = document.createElement('div');
      const dataHook = 'badge-hook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div><Badge type="warning" alignment="bottom" dataHook={dataHook}>Hi</Badge></div>
      ));
      const badgeTestkit = badgeTestkitFactory({wrapper, dataHook});
      expect(badgeTestkit.isOfType('warning')).toBeTruthy();
      expect(badgeTestkit.isOfType('bottom')).toBeTruthy();
    });
    it('info middle', () => {
      const div = document.createElement('div');
      const dataHook = 'badge-hook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div><Badge type="info" alignment="middle" dataHook={dataHook}>Hi</Badge></div>
      ));
      const badgeTestkit = badgeTestkitFactory({wrapper, dataHook});
      expect(badgeTestkit.isOfType('info')).toBeTruthy();
      expect(badgeTestkit.isOfType('middle')).toBeTruthy();
    });
    it('danger top', () => {
      const div = document.createElement('div');
      const dataHook = 'badge-hook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div><Badge type="danger" alignment="top" dataHook={dataHook}>Hi</Badge></div>
      ));
      const badgeTestkit = badgeTestkitFactory({wrapper, dataHook});
      expect(badgeTestkit.isOfType('danger')).toBeTruthy();
      expect(badgeTestkit.isOfType('top')).toBeTruthy();
    });
    it('success top', () => {
      const div = document.createElement('div');
      const dataHook = 'badge-hook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div><Badge type="success" alignment="top" dataHook={dataHook}>Hi</Badge></div>
      ));
      const badgeTestkit = badgeTestkitFactory({wrapper, dataHook});
      expect(badgeTestkit.isOfType('success')).toBeTruthy();
      expect(badgeTestkit.isOfType('top')).toBeTruthy();
    });
    it('default top', () => {
      const div = document.createElement('div');
      const dataHook = 'badge-hook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div><Badge type="default" alignment="top" dataHook={dataHook}>Hi</Badge></div>
      ));
      const badgeTestkit = badgeTestkitFactory({wrapper, dataHook});
      expect(badgeTestkit.isOfType('default')).toBeTruthy();
      expect(badgeTestkit.isOfType('top')).toBeTruthy();
    });

    it('defaults', () => {
      const div = document.createElement('div');
      const dataHook = 'badge-hook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div><Badge dataHook={dataHook}>Hi</Badge></div>
      ));
      const badgeTestkit = badgeTestkitFactory({wrapper, dataHook});
      expect(badgeTestkit.isOfType('default')).toBeTruthy();
      expect(badgeTestkit.isOfType('middle')).toBeTruthy();
    });
  });

  describe('should be able to apply all the css classes by user', () => {
    it('primary and alignment top', () => {
      const div = document.createElement('div');
      const dataHook = 'badge-hook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div>
          <Badge
            alignment="top"
            type="primary"
            primaryClassName="primaryCustomClassName"
            warningClassName="warningCustomClassName"
            defaultClassName="defaultCustomClassName"
            successClassName="successCustomClassName"
            dangerClassName="dangerCustomClassName"
            infoClassName="infoCustomClassName"
            alignmentTopClassName="alignmentTopCustomClassName"
            alignmentBottomClassName="alignmentBottomCustomClassName"
            alignmentMiddleClassName="alignmentMiddleCustomClassName"
            dataHook={dataHook}
            >Hi</Badge>
        </div>
      ));
      const badgeTestkit = badgeTestkitFactory({wrapper, dataHook});
      expect(badgeTestkit.hasClass('primaryCustomClassName')).toBeTruthy();
      expect(badgeTestkit.hasClass('alignmentTopCustomClassName')).toBeTruthy();
    });
    it('warning and middle', () => {
      const div = document.createElement('div');
      const dataHook = 'badge-hook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div><Badge
          alignment="middle"
          type="warning"
          primaryClassName="primaryCustomClassName"
          warningClassName="warningCustomClassName"
          defaultClassName="defaultCustomClassName"
          successClassName="successCustomClassName"
          dangerClassName="dangerCustomClassName"
          infoClassName="infoCustomClassName"
          alignmentTopClassName="alignmentTopCustomClassName"
          alignmentBottomClassName="alignmentBottomCustomClassName"
          alignmentMiddleClassName="alignmentMiddleCustomClassName"
          dataHook={dataHook}
          >Hi</Badge></div>
      ));
      const badgeTestkit = badgeTestkitFactory({wrapper, dataHook});
      expect(badgeTestkit.hasClass('warningCustomClassName')).toBeTruthy();
      expect(badgeTestkit.hasClass('alignmentMiddleCustomClassName')).toBeTruthy();
    });
    it('info and bottom', () => {
      const div = document.createElement('div');
      const dataHook = 'badge-hook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div><Badge
          alignment="bottom"
          type="info"
          primaryClassName="primaryCustomClassName"
          warningClassName="warningCustomClassName"
          defaultClassName="defaultCustomClassName"
          successClassName="successCustomClassName"
          dangerClassName="dangerCustomClassName"
          infoClassName="infoCustomClassName"
          alignmentTopClassName="alignmentTopCustomClassName"
          alignmentBottomClassName="alignmentBottomCustomClassName"
          alignmentMiddleClassName="alignmentMiddleCustomClassName"
          dataHook={dataHook}
          >Hi</Badge></div>
      ));
      const badgeTestkit = badgeTestkitFactory({wrapper, dataHook});
      expect(badgeTestkit.hasClass('infoCustomClassName')).toBeTruthy();
      expect(badgeTestkit.hasClass('alignmentBottomCustomClassName')).toBeTruthy();
    });
    it('danger and top', () => {
      const div = document.createElement('div');
      const dataHook = 'badge-hook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div><Badge
          alignment="top"
          type="danger"
          primaryClassName="primaryCustomClassName"
          warningClassName="warningCustomClassName"
          defaultClassName="defaultCustomClassName"
          successClassName="successCustomClassName"
          dangerClassName="dangerCustomClassName"
          infoClassName="infoCustomClassName"
          alignmentTopClassName="alignmentTopCustomClassName"
          alignmentBottomClassName="alignmentBottomCustomClassName"
          alignmentMiddleClassName="alignmentMiddleCustomClassName"
          dataHook={dataHook}
          >Hi</Badge></div>
      ));
      const badgeTestkit = badgeTestkitFactory({wrapper, dataHook});
      expect(badgeTestkit.hasClass('dangerCustomClassName')).toBeTruthy();
      expect(badgeTestkit.hasClass('alignmentTopCustomClassName')).toBeTruthy();
    });
    it('success and top', () => {
      const div = document.createElement('div');
      const dataHook = 'badge-hook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div><Badge
          alignment="top"
          type="success"
          primaryClassName="primaryCustomClassName"
          warningClassName="warningCustomClassName"
          defaultClassName="defaultCustomClassName"
          successClassName="successCustomClassName"
          dangerClassName="dangerCustomClassName"
          infoClassName="infoCustomClassName"
          alignmentTopClassName="alignmentTopCustomClassName"
          alignmentBottomClassName="alignmentBottomCustomClassName"
          alignmentMiddleClassName="alignmentMiddleCustomClassName"
          dataHook={dataHook}
          >Hi</Badge></div>
      ));
      const badgeTestkit = badgeTestkitFactory({wrapper, dataHook});
      expect(badgeTestkit.hasClass('successCustomClassName')).toBeTruthy();
      expect(badgeTestkit.hasClass('alignmentTopCustomClassName')).toBeTruthy();
    });
    it('should have defaults', () => {
      const div = document.createElement('div');
      const dataHook = 'badge-hook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div><Badge
          alignmentMiddleClassName="alignmentMiddleCustomClassName"
          defaultClassName="defaultCustomClassName"
          dataHook={dataHook}
          >Hi</Badge></div>
      ));
      const badgeTestkit = badgeTestkitFactory({wrapper, dataHook});
      expect(badgeTestkit.hasClass('defaultCustomClassName')).toBeTruthy();
      expect(badgeTestkit.hasClass('alignmentMiddleCustomClassName')).toBeTruthy();
    });
  });

});
