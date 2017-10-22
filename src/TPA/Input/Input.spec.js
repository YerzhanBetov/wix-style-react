import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Input from './Input';
import {tpaInputTestkitFactory as inputTestkitFactory} from '../../../testkit';
import {tpaInputTestkitFactory as enzymeInputTestkitFactory} from '../../../testkit/enzyme';
import {isEnzymeTestkitExists} from '../../../testkit/test-common';

describe('Input', () => {
  let div;
  const dataHook = 'input-hook';

  const renderToDocument = component => (
    div.appendChild(ReactTestUtils.renderIntoDocument(<div>{component}</div>))
  );

  beforeEach(() => div = document.createElement('div'));

  it('should exist', () => {
    const wrapper = renderToDocument(<Input dataHook={dataHook}/>);
    const inputTestkit = inputTestkitFactory({wrapper, dataHook});
    expect(inputTestkit.exists()).toBeTruthy();
  });

  it('should contain default value', () => {
    const wrapper = renderToDocument(
      <Input defaultValue="some default value" dataHook={dataHook}/>
    );

    const inputTestkit = inputTestkitFactory({wrapper, dataHook});
    expect(inputTestkit.getValue()).toEqual('some default value');
  });

  it('should return passed value', () => {
    const wrapper = renderToDocument(
      <Input value="the value" onChange={() => {}} dataHook={dataHook}/>
    );

    const inputTestkit = inputTestkitFactory({wrapper, dataHook});
    expect(inputTestkit.getValue()).toEqual('the value');
  });

  it('should have input class', () => {
    const wrapper = renderToDocument(
      <Input styles={{locals: {input: 'input'}}} dataHook={dataHook}/>
    );

    const inputTestkit = inputTestkitFactory({wrapper, dataHook});
    expect(inputTestkit.hasClass('input')).toBeTruthy();
    expect(inputTestkit.hasClass('error')).toBeFalsy();
  });

  it('should be in error state', () => {
    const wrapper = renderToDocument(
      <Input error styles={{locals: {input: 'input', error: 'error'}}} dataHook={dataHook}/>
    );

    const inputTestkit = inputTestkitFactory({wrapper, dataHook});
    expect(inputTestkit.hasClass('error')).toBeTruthy();
  });

  it('should be able to pass error class name', () => {
    const wrapper = renderToDocument(
      <Input error errorClassName="customErrorClassName" styles={{locals: {input: 'input', error: 'error'}}} dataHook={dataHook}/>
    );

    const inputTestkit = inputTestkitFactory({wrapper, dataHook});
    expect(inputTestkit.hasClass('customErrorClassName')).toBeTruthy();
  });

  it('should be able to pass custom input css class name', () => {
    const wrapper = renderToDocument(
      <Input error inputClassName="customInputClassName" styles={{locals: {input: 'input', error: 'error'}}} dataHook={dataHook}/>
    );

    const inputTestkit = inputTestkitFactory({wrapper, dataHook});
    expect(inputTestkit.hasClass('customInputClassName')).toBeTruthy();
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Input/>, enzymeInputTestkitFactory)).toBe(true);
    });
  });
});
