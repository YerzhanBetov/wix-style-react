import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Label from './Label';
import {tpaLabelTestkitFactory as labelTestkitFactory} from '../../../testkit';

describe('Label', () => {
  it('should exist', () => {
    const div = document.createElement('div');
    const dataHook = 'Label-hook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <Label dataHook={dataHook}/>
      </div>
    ));
    const labelTestkit = labelTestkitFactory({wrapper, dataHook});
    expect(labelTestkit.exists()).toBeTruthy();
  });

  it('should contain passed text', () => {
    const div = document.createElement('div');
    const dataHook = 'Label-hook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <Label dataHook={dataHook}>
          some text
        </Label>
      </div>
    ));
    const labelTestkit = labelTestkitFactory({wrapper, dataHook});
    expect(labelTestkit.getContent()).toEqual('some text');
  });

  it('should contain passed dom element', () => {
    const div = document.createElement('div');
    const dataHook = 'Label-hook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <Label dataHook={dataHook}>
          <span>some text</span>
        </Label>
      </div>
    ));
    const labelTestkit = labelTestkitFactory({wrapper, dataHook});
    expect(labelTestkit.getContent()).toEqual('<span>some text</span>');
  });

  it('should contain passed dom element', () => {
    const div = document.createElement('div');
    const dataHook = 'Label-hook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <Label for="some-id" dataHook={dataHook}>
          <span>some text</span>
        </Label>
      </div>
    ));
    const labelTestkit = labelTestkitFactory({wrapper, dataHook});
    expect(labelTestkit.getAttribute('for')).toEqual('some-id');
  });
  it('should contain passed dom element', () => {
    const div = document.createElement('div');
    const dataHook = 'Label-hook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <Label for="some-id" dataHook={dataHook}>
          <span>some text</span>
        </Label>
      </div>
    ));
    const labelTestkit = labelTestkitFactory({wrapper, dataHook});
    expect(labelTestkit.getAttribute('data-hook')).toEqual('Label-hook');
  });

  it('should contain custom class name', () => {
    const div = document.createElement('div');
    const dataHook = 'Label-hook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
      <div>
        <Label for="some-id" labelClassName="customLabelStyle" dataHook={dataHook}>
          <span>some text</span>
        </Label>
      </div>
    ));
    const labelTestkit = labelTestkitFactory({wrapper, dataHook});
    expect(labelTestkit.hasClass('customLabelStyle')).toBeTruthy();
  });

});
