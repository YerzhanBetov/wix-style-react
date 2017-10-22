import React from 'react';
import {createDriverFactory} from '../test-common';
import richTextAreaDriverFactory from './RichTextArea.driver';
import RichTextArea from './RichTextArea';

const mockGetSelection = () => {
  const original = window.getSelection;
  const fn = () => ({});
  fn.restore = () => window.getSelection = original;
  window.getSelection = fn;
};

describe('RichTextArea', () => {
  let currentValue;

  beforeEach(() => {
    mockGetSelection();
  });

  afterEach(() => {
    window.getSelection.restore();
  });

  it('should render value as text', () => {
    const text = 'text content';
    const driver = createComponent({
      value: `<p>${text}</p>`
    });
    expect(driver.getContent()).toBe(text);
  });

  it('should call callback on change', () => {
    const driver = createComponent();
    const text = 'testing';
    driver.enterText(text);
    expect(currentValue).toBe(`<p>${text}</p>`);
  });

  it('should render buttons specified in props.buttons', () => {
    const buttons = [
      'bold',
      'italic',
      'underline',
      'link',
      'unordered-list',
      'ordered-list'
    ];
    const driver = createComponent({buttons});
    expect(driver.getButtonTypes()).toEqual(buttons);
  });

  it('should handle bold button click', () => {
    const driver = createComponent({buttons: ['bold']});
    driver.clickBoldButton();
    driver.enterText('test');

    expect(currentValue).toEqual('<p><strong>test</strong></p>');
  });

  it('should handle italic button click', () => {
    const driver = createComponent({buttons: ['italic']});
    driver.clickItalicButton();
    driver.enterText('test');

    expect(currentValue).toEqual('<p><em>test</em></p>');
  });

  it('should handle underline button click', () => {
    const driver = createComponent({buttons: ['underline']});
    driver.clickUnderlineButton();
    driver.enterText('test');

    expect(currentValue).toEqual('<p><u>test</u></p>');
  });

  it('should handle unordered-list button click', () => {
    const driver = createComponent({buttons: ['unordered-list']});
    driver.clickUnorderedListButton();
    driver.enterText('test');

    expect(currentValue).toEqual('<ul><li>test</li></ul>');
  });

  it('should handle ordered-list button click', () => {
    const driver = createComponent({buttons: ['ordered-list']});
    driver.clickOrderedListButton();
    driver.enterText('test');

    expect(currentValue).toEqual('<ol><li>test</li></ol>');
  });

  it('should show error indicator', () => {
    const driver = createComponent({error: true});
    expect(driver.isErrorIndicatorVisible()).toBeTruthy();
  });

  it('should render placeholder', () => {
    const driver = createComponent({placeholder: 'HELLO'});
    expect(driver.getContent()).toBe('HELLO');
  });

  it('should be disabled', () => {
    const driver = createComponent({disabled: true});
    expect(driver.isDisabled()).toBeTruthy();
  });

  describe('resizable attribute', () => {
    it('should pass down to the wrapped input', () => {
      const driver = createComponent({resizable: true});
      expect(driver.isResizable()).toBeTruthy();
    });

    it('should pass down to the wrapped input with default false value', () => {
      const driver = createComponent();
      expect(driver.isResizable()).toBeFalsy();
    });
  });

  describe('insert image', () => {
    const onImageRequest = callback => {
      callback('https://some-dom.com/ddec1e4d26f94cae963c8c54e9838749/600x600.jpg');
    };

    it('should not show insert image icon only when props does not contain \'onImageRequest\' callback', () => {
      const driver = createComponent();
      expect(driver.isAddImageButtonExist()).toBeFalsy();
    });

    it('should show insert image icon only when props does contain \'onImageRequest\' callback', () => {
      const driver = createComponent({onImageRequest});
      expect(driver.isAddImageButtonExist()).toBeTruthy();
    });

    it('should insert image to the editor', () => {
      const driver = createComponent({onImageRequest});
      expect(driver.isImageExist()).toBeFalsy();
      driver.clickImageButton();
      expect(driver.isImageExist()).toBeTruthy();
    });

    it('insert a default block after inserting an image, given an empty document', () => {
      const driver = createComponent({onImageRequest});
      driver.clickImageButton();
      expect(driver.isDefaultBlockExist()).toBeTruthy();
    });
  });

  const createDriver = createDriverFactory(richTextAreaDriverFactory);
  function createComponent(props) {
    const mergedProps = Object.assign({
      onChange: newValue => currentValue = newValue
    }, props);
    return createDriver(<RichTextArea {...mergedProps}/>);
  }
});
