import React from 'react';
import inputAreaDriverFactory from './InputArea.driver';
import InputArea from './InputArea';
import {createDriverFactory} from '../test-common';
import {inputAreaTestkitFactory, tooltipTestkitFactory} from '../../testkit';
import {inputAreaTestkitFactory as enzymeInputAreaTestkitFactory} from '../../testkit/enzyme';
import sinon from 'sinon';
import {isTestkitExists, isEnzymeTestkitExists} from '../../testkit/test-common';

describe('InputArea', () => {
  const createDriver = createDriverFactory(inputAreaDriverFactory);

  const InputAreaForTesting = props => (<InputArea {...props} dataHook="textarea-div"/>);

  describe('value attribute', () => {
    it('should pass down to the wrapped input', () => {
      const props = {
        value: 'hello',
        onChange: () => {}
      };

      const driver = createDriver(<InputAreaForTesting {...props}/>);
      expect(driver.getValue()).toEqual(props.value);
    });
  });

  describe('defaultValue attribute', () => {
    it('should pass down to the wrapped input', () => {
      const defaultValue = 'hello';

      const driver = createDriver(<InputAreaForTesting defaultValue={defaultValue}/>);
      expect(driver.getDefaultValue()).toEqual(defaultValue);
    });
  });

  describe('rows attribute', () => {
    it('should pass down to the wrapped input', () => {
      const rows = 5;

      const driver = createDriver(<InputAreaForTesting rows={rows}/>);
      expect(driver.getRowsCount()).toEqual(rows);
    });
  });

  describe('maxHeight attribute', () => {
    it('should pass down to the wrapped input', () => {
      const maxHeight = '50px';

      const driver = createDriver(<InputAreaForTesting maxHeight={maxHeight}/>);
      expect(driver.getStyle().maxHeight).toEqual(maxHeight);
    });
  });

  describe('maxLength attribute', () => {
    it('should pass down to the wrapped input - with max length', () => {
      const maxLength = 5;

      const driver = createDriver(<InputAreaForTesting maxLength={maxLength}/>);
      expect(driver.getMaxLength()).toEqual(maxLength);
    });
  });


  describe('hasCounter attribute', () => {
    it('should pass down to the wrapped input', () => {
      const driver = createDriver(<InputAreaForTesting hasCounter/>);
      expect(driver.getHasCounter()).toBeTruthy();
    });

    it('should pass down to the wrapped input with default false value', () => {
      const driver = createDriver(<InputAreaForTesting/>);
      expect(driver.getHasCounter()).toBeFalsy();
    });
  });

  describe('resizable attribute', () => {
    it('should pass down to the wrapped input', () => {
      const driver = createDriver(<InputAreaForTesting resizable/>);
      expect(driver.getResizable()).toBeTruthy();
    });

    it('should pass down to the wrapped input with default false value', () => {
      const driver = createDriver(<InputAreaForTesting/>);
      expect(driver.getResizable()).toBeFalsy();
    });
  });

  describe('rows attribute', () => {
    it('should pass down to the wrapped input', () => {
      const rows = 5;

      const driver = createDriver(<InputAreaForTesting rows={rows}/>);
      expect(driver.getRowsCount()).toEqual(rows);
    });
  });

  describe('tabIndex attribute', () => {
    it('should pass down to the wrapped input', () => {
      const tabIndex = 1;

      const driver = createDriver(<InputAreaForTesting tabIndex={tabIndex}/>);
      expect(driver.getTabIndex()).toEqual(tabIndex);
    });
  });

  describe('readOnly attribute', () => {
    it('should pass down to the wrapped input', () => {
      const driver = createDriver(<InputAreaForTesting readOnly/>);
      expect(driver.getReadOnly()).toBeTruthy();
    });

    it('should pass down to the wrapped input with default false value', () => {
      const driver = createDriver(<InputAreaForTesting/>);
      expect(driver.getReadOnly()).toBeFalsy();
    });
  });

  describe('error attribute', () => {
    it('should display an error icon if error is true', () => {
      const driver = createDriver(<InputAreaForTesting error/>);

      expect(driver.hasError()).toBeTruthy();
    });
  });

  describe('onChange attribute', () => {
    it('should be called when text is entered to the input', () => {

      const onChange = jest.fn();
      const event = {target: {value: 'world'}};

      const driver = createDriver(<InputAreaForTesting onChange={onChange}/>);

      driver.trigger('change', event);

      expect(onChange).toBeCalled();
    });
  });

  describe('onKeyUp attribute', () => {
    it('should be called after keybord key got pressed and then released', () => {
      const onKeyUp = jest.fn();
      const event = {target: {value: 'world'}};

      const driver = createDriver(<InputAreaForTesting onKeyUp={onKeyUp}/>);

      driver.trigger('keyUp', event);

      expect(onKeyUp).toBeCalled();
    });
  });

  describe('onFocus attribute', () => {
    it('should be called when the input gets focused', () => {
      const onFocus = jest.fn();
      const driver = createDriver(<InputAreaForTesting onFocus={onFocus}/>);

      driver.trigger('focus');

      expect(onFocus).toBeCalled();
    });
  });

  describe('onBlur attribute', () => {
    it('should be called when the input gets blured', () => {
      const onBlur = jest.fn();
      const driver = createDriver(<InputAreaForTesting onBlur={onBlur}/>);

      driver.trigger('blur');

      expect(onBlur).toBeCalled();
    });
  });

  describe('onKeyDown attribute', () => {
    it('should be called when text is entered to the wrapped input', () => {
      const onKeyDown = jest.fn();
      const event = {keyCode: 40};

      const driver = createDriver(<InputAreaForTesting onKeyDown={onKeyDown}/>);

      driver.trigger('keyDown', event);

      expect(onKeyDown).toBeCalled();
    });
  });

  describe('onEnter attribute', () => {
    it('should be called when text is entered to the wrapped input', () => {
      const onEnterPressed = jest.fn();
      const event = {key: 'Enter', keyCode: 13, which: 13};

      const driver = createDriver(<InputAreaForTesting onEnterPressed={onEnterPressed}/>);

      driver.trigger('keyDown', event);

      expect(onEnterPressed).toBeCalled();
    });
  });

  describe('forceFocus attribute', () => {
    it('should have focus class on input if forceFocus is true', () => {
      const driver = createDriver(<InputAreaForTesting forceFocus/>);
      expect(driver.isFocusedStyle()).toBeTruthy();
    });
  });

  describe('forceHover attribute', () => {
    it('should have hover class on input if forceHover is true', () => {
      const driver = createDriver(<InputAreaForTesting forceHover/>);
      expect(driver.isHoveredStyle()).toBeTruthy();
    });

    it('should be hovered if forceFocus is false and forceHover is true', () => {
      const driver = createDriver(<InputAreaForTesting forceHover forceFocus={false}/>);
      expect(driver.isHoveredStyle()).toBeTruthy();
    });
  });

  describe('autoFocus attribute', () => {
    it('Mounting an input element with autoFocus=false, should give it the focus', () => {
      let autoFocus = false;
      const driver = createDriver(<InputAreaForTesting autoFocus={false}/>);
      expect(driver.isFocus()).toBeFalsy();
      autoFocus = true;
      driver.setProps({autoFocus});
      expect(driver.isFocus()).toBeFalsy();
    });

    it('Mounting an input element with autoFocus=true, gives it the focus', () => {
      const driver = createDriver(<InputAreaForTesting autoFocus/>);
      expect(driver.isFocus()).toBeTruthy();
    });
  });

  describe('focus function', () => {
    it('calling focus should give focus to the input', () => {
      const driver = createDriver(<InputAreaForTesting autoFocus={false}/>);
      expect(driver.isFocus()).toBeFalsy();
      driver.focus();
      expect(driver.isFocus()).toBeTruthy();
    });
  });

  describe('theme attribute', () => {
    it('should set the theme by default to "normal"', () => {
      const driver = createDriver(<InputAreaForTesting/>);
      expect(driver.isOfStyle('normal')).toBeTruthy();
    });

    it('should allowing setting the theme to "paneltitle"', () => {
      const driver = createDriver(<InputAreaForTesting theme="paneltitle"/>);
      expect(driver.isOfStyle('paneltitle')).toBeTruthy();
    });

    it('should allow setting the theme to "material"', () => {
      const driver = createDriver(<InputAreaForTesting theme="material"/>);
      expect(driver.isOfStyle('material')).toBeTruthy();
    });
  });

  describe('aria attributes', () => {
    const createDriver = createDriverFactory(inputAreaDriverFactory);

    it('should allow adding a custom aria-label', () => {
      const driver = createDriver(<InputAreaForTesting ariaLabel="hello"/>);
      expect(driver.getAriaLabel()).toBe('hello');
    });

    it('should not have any aria label buy default', () => {
      const driver = createDriver(<InputAreaForTesting/>);
      expect(driver.getAriaLabel()).toBeNull;
    });

    it('should allow adding aria-controls', () => {
      const driver = createDriver(<InputAreaForTesting ariaControls="id"/>);
      expect(driver.getAriaControls()).toBe('id');
    });

    it('should not have any aria controls buy default', () => {
      const driver = createDriver(<InputAreaForTesting/>);
      expect(driver.getAriaControls()).toBeNull;
    });

    it('should allow adding aria-controls', () => {
      const driver = createDriver(<InputAreaForTesting ariaDescribedby="blabla"/>);
      expect(driver.getAriaDescribedby()).toBe('blabla');
    });

    it('should not have any aria controls buy default', () => {
      const driver = createDriver(<InputAreaForTesting/>);
      expect(driver.getAriaDescribedby()).toBeNull;
    });

  });


  describe('test tooltip', () => {

    const resolveIn = timeout =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve({});
        }, timeout);
      });

    describe('onTooltipShow attribute', () => {
      it('should not display the tooltip by default', () => {
        const driver = createDriver(<InputAreaForTesting error errorMessage="I'm the error message"/>);
        const dataHook = driver.getTooltipDataHook();
        const wrapper = driver.getTooltipElement();
        const tooltipDriver = tooltipTestkitFactory({wrapper, dataHook});

        return resolveIn(500).then(() => {
          expect(tooltipDriver.isShown()).toBe(false);
        });
      });

      it('should display the tooltip on mouse hover', () => {
        const driver = createDriver(<InputAreaForTesting error errorMessage="I'm the error message"/>);
        const dataHook = driver.getTooltipDataHook();
        const wrapper = driver.getTooltipElement();
        const tooltipDriver = tooltipTestkitFactory({wrapper, dataHook});
        tooltipDriver.mouseEnter();

        return resolveIn(500).then(() => {
          expect(tooltipDriver.getContent()).toBe('I\'m the error message');
        });
      });

      it('should call onTooltipShow callback when error tooltip become active', () => {
        const onTooltipShow = sinon.spy();
        const driver = createDriver(<InputAreaForTesting error errorMessage="I'm the error message" onTooltipShow={onTooltipShow}/>);
        const dataHook = driver.getTooltipDataHook();
        const wrapper = driver.getTooltipElement();
        const tooltipDriver = tooltipTestkitFactory({wrapper, dataHook});
        tooltipDriver.mouseEnter();

        return resolveIn(500).then(() => {
          expect(onTooltipShow.calledOnce).toBeTruthy();
        });
      });
    });

    describe('tooltipPlacement attribute', () => {
      ['top', 'bottom', 'left', 'right'].forEach(placement => {
        it(`should have a tooltip positioned to the ${placement}`, () => {
          const driver = createDriver(<InputAreaForTesting error errorMessage="I'm the error message" tooltipPlacement={placement}/>);
          const dataHook = driver.getTooltipDataHook();
          const wrapper = driver.getTooltipElement();
          const tooltipDriver = tooltipTestkitFactory({wrapper, dataHook});
          tooltipDriver.mouseEnter();

          return resolveIn(500).then(() => {
            expect(tooltipDriver.getPlacement()).toBe(placement);
          });
        });
      });
    });
  });
});

describe('testkit', () => {
  it('should exist', () => {
    const value = 'hello';
    const onChange = () => {};
    expect(isTestkitExists(<InputArea dataHook="texarea-div" value={value} onChange={onChange}/>, inputAreaTestkitFactory)).toBe(true);
  });
});

describe('enzyme testkit', () => {
  it('should exist', () => {
    const value = 'hello';
    const onChange = () => {};
    expect(isEnzymeTestkitExists(<InputArea dataHook="texarea-div" value={value} onChange={onChange}/>, enzymeInputAreaTestkitFactory)).toBe(true);
  });
});
