import React from 'react';
import {mount} from 'enzyme';
import tpaStyleInjector from './TpaStyleInjector';

const DummyComponent = () => <div>Dummy Component</div>;
DummyComponent.displayName = 'DummyComponent';

const DummyComponent2 = () => <div>Dummy Component 2</div>;
DummyComponent2.displayName = 'DummyComponent2';

const DummyComponentWithoutDisplayName = () => <div>Dummy Component</div>;

const MockStyle = function () {};
MockStyle.prototype.toString = () => '.a { background-color: red; }';
const mockStyle = new MockStyle();

const WiredMockStyle = function () {};
WiredMockStyle.prototype.toString = () => '.a { background-color: "{{ color-1 }}"; }';
const wiredMockStyle = new WiredMockStyle();

const head = document.head;

describe('TpaStyleInjector', () => {
  it('Should render wrapped component', () => {
    const Component = tpaStyleInjector(DummyComponent);
    const wrapper = mount(<Component/>);
    expect(wrapper.html()).toBe('<div>Dummy Component</div>');
  });

  it('Should throw when component missing displayName', () => {
    expect(() => tpaStyleInjector(DummyComponentWithoutDisplayName)).toThrow('Component must have a displayName');
  });

  describe('Stylesheet injection', () => {
    beforeEach(() => {
      const Component = tpaStyleInjector(DummyComponent, mockStyle);
      mount(<Component/>);
    });

    afterEach(() => {
      Array.from(head.children)
        .forEach(element => element.remove());
    });

    it('Should inject stylesheet', () => {
      expect(head.firstChild.tagName).toBe('STYLE');
    });

    it('Should set attribute wix-style to element', () => {
      expect(head.firstChild.getAttribute('wix-style')).toBe('');
    });

    it('Should set attribute wix-style-react-[Component.displayName] to element', () => {
      expect(head.firstChild.getAttribute('wix-style-react-DummyComponent')).toBeTruthy();
    });

    it('Should inject stylesheet contents', () => {
      expect(head.firstChild.innerText).toBe(mockStyle.toString());
    });
  });

  describe('Idempotent stylesheet', () => {
    const Component = tpaStyleInjector(DummyComponent, mockStyle);

    beforeEach(() => {
      mount(<Component/>);
    });

    afterAll(() => {
      Array.from(head.children)
        .forEach(element => element.remove());
    });

    it('Should inject stylesheet on first rendering', () => {
      expect(head.children.length).toBe(1);
    });

    it('Should not inject after the second rendering', () => {
      expect(head.children.length).toBe(1);
    });

  });

  describe('Stylesheet injection - more than one component', () => {
    beforeEach(() => {
      const Component1 = tpaStyleInjector(DummyComponent, mockStyle);
      const Component2 = tpaStyleInjector(DummyComponent2, mockStyle);
      mount(<Component1/>);
      mount(<Component2/>);
    });

    afterAll(() => {
      Array.from(head.children)
        .forEach(element => element.remove());
    });

    it('Should inject correct attributes', () => {
      expect(head.firstChild.getAttribute('wix-style-react-DummyComponent2')).toBeTruthy();
      expect(head.children[1].getAttribute('wix-style-react-DummyComponent')).toBeTruthy();
    });

    it('Should keep stylesheets from duplications', () => {
      expect(head.children.length).toBe(2);
    });
  });

  describe('Wired styling', () => {
    const Component = tpaStyleInjector(DummyComponent, wiredMockStyle);

    beforeEach(() => {
      mount(<Component/>);
    });

    afterAll(() => {
      Array.from(head.children)
        .forEach(element => element.remove());
    });

    it('Should remove quotes from wired styles', () => {
      expect(head.firstChild.innerText).toBe('.a { background-color: {{ color-1 }}; }');
    });
  });
});
