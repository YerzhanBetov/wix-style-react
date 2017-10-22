import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import tooltipDriverFactory from './Tooltip.driver';
import Tooltip from './Tooltip';
import {createDriverFactory} from '../../test-common';
import {buttonTestkitFactory, backofficeTooltipTestkitFactory as tooltipTestkitFactory} from '../../../testkit';
import {backofficeTooltipTestkitFactory as enzymeTooltipTestkitFactory} from '../../../testkit/enzyme';
import {mount} from 'enzyme';
import {Button} from '../../../src/Backoffice';
import waitForCond from 'wait-for-cond';

describe('Tooltip', () => {

  const createDriver = createDriverFactory(tooltipDriverFactory);
  const _props = {showDelay: 5, hideDelay: 5, content: <div>Some content</div>};
  const children = <div>foo children</div>;

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should be hidden by default', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    expect(driver.isShown()).toBeFalsy();
  });

  it('should show a tooltip once hovering', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    expect(driver.isShown()).toBeFalsy();
    return waitFor.assert(() => expect(driver.isShown()).toBeTruthy());
  });

  it('should hide when mouse leaving', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    expect(driver.isShown()).toBeFalsy();

    return waitFor
      .assert(() => expect(driver.isShown()).toBeTruthy())
      .then(() => driver.mouseLeave())
      .then(() => waitFor.assert(() => expect(driver.isShown()).toBeFalsy()));
  });

  it('click triggers', () => {
    const driver = createDriver(<Tooltip {...{..._props, showTrigger: 'click', hideTrigger: 'click'}}>{children}</Tooltip>);
    driver.click();

    return waitFor.assert(() => expect(driver.isShown()).toBeTruthy())
      .then(() => {
        driver.click();
        return waitFor.assert(() => expect(driver.isShown()).toBeFalsy());
      });
  });

  it('show on focus, hide on blur', () => {
    const driver = createDriver(
      <Tooltip {...{..._props, showTrigger: 'focus', hideTrigger: 'blur'}}>
        <input/>
      </Tooltip>
    );

    driver.focus();

    return waitFor.assert(() => expect(driver.isShown()).toBeTruthy())
      .then(() => {
        driver.blur();
        return waitFor.assert(() => expect(driver.isShown()).toBeFalsy());
      });
  });

  it('hover trigger is disabled in click mode', () => {
    const driver = createDriver(
      <Tooltip {...{..._props, showTrigger: 'click', hideTrigger: 'click'}}>
        {children}
      </Tooltip>
    );

    driver.mouseEnter();

    return waitFor.assertHold(() => expect(driver.isShown()).toBeFalsy(), 300);
  });

  it('custom mode - mouse enter does not hide', () => {
    const driver = createDriver(
      <Tooltip {...{..._props, showTrigger: 'custom', hideTrigger: 'custom'}} active>
        <input/>
      </Tooltip>
    );

    expect(driver.isShown()).toBeTruthy();

    driver.mouseEnter();

    return waitFor.assertHold(() => expect(driver.isShown()).toBeTruthy());
  });

  it('focus and blur triggers', () => {
    const driver = createDriver(
      <Tooltip {...{..._props, showTrigger: 'focus', hideTrigger: 'blur'}}>
        <input/>
      </Tooltip>
    );

    driver.focus();

    return waitFor.assert(() => expect(driver.isShown()).toBeTruthy())
      .then(() => {
        driver.blur();
        return waitFor.assert(() => expect(driver.isShown()).toBeFalsy());
      });
  });

  it('should hide tooltip when using custom triggers', () => {
    const props = {..._props, hideTrigger: 'custom', showTrigger: 'custom'};
    const driver = createDriver(<Tooltip {...props}>{children}</Tooltip>);
    driver.mouseEnter();

    expect(driver.isShown()).toBeFalsy();
    driver.setProps({...props, active: true});

    return waitFor.assert(() => {
      expect(driver.isShown()).toBeTruthy();
    })
    .then(() => {
      driver.setProps({...props, active: false});

      return waitFor.assert(() => {
        expect(driver.isShown()).toBeFalsy();
      });
    });
  });

  it('should test inner component', () => {
    const dataHook = 'button_data_hook';
    const buttonContent = (
      <div>
        Custom Content...&nbsp;
        <Button dataHook={dataHook} id="inner-button" height="small">Button content</Button>
      </div>
    );
    const driver = createDriver(<Tooltip showDelay={5} hideDelay={5} content={buttonContent}>{children}</Tooltip>);
    driver.mouseEnter();
    expect(driver.isShown()).toBeFalsy();

    return waitFor.assert(() => expect(driver.isShown()).toBeTruthy())
    .then(() => {
      const buttonTestkit = buttonTestkitFactory({wrapper: driver.getTooltipWrapper(), dataHook});
      expect(buttonTestkit.getButtonTextContent()).toBe('Button content');
    });
  });

  it('should not override focus event', () => {
    const onFocus = jest.fn();
    const onFocusedChild = <div onFocus={onFocus}>foo children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onFocusedChild}</Tooltip>);
    driver.focus();
    expect(onFocus).toBeCalled();
  });

  it('should not override blur event', () => {
    const onBlur = jest.fn();
    const onBluredChild = <div onBlur={onBlur}>foo children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onBluredChild}</Tooltip>);
    driver.blur();
    expect(onBlur).toBeCalled();
  });

  it('should not override click event', () => {
    const onClick = jest.fn();
    const onClickedChild = <div onClick={onClick}>foo children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onClickedChild}</Tooltip>);
    driver.click();
    expect(onClick).toBeCalled();
  });

  it('should not override mouse enter event', () => {
    const onMouseEnter = jest.fn();
    const onMouseEnteredChild = <div onMouseEnter={onMouseEnter}>foo children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onMouseEnteredChild}</Tooltip>);
    driver.mouseEnter();
    expect(onMouseEnter).toBeCalled();
  });

  it('should not override mouse leave event', () => {
    const onMouseLeave = jest.fn();
    const onMouseLeavedChild = <div onMouseLeave={onMouseLeave}>foo children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onMouseLeavedChild}</Tooltip>);
    driver.mouseLeave();
    expect(onMouseLeave).toBeCalled();
  });

  it('should support error theme', () => {
    const driver = createDriver(<Tooltip theme={'error'} {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    return waitFor.assert(() => expect(driver.hasErrorTheme()).toBeTruthy());
  });

  it('should support dark theme', () => {
    const driver = createDriver(<Tooltip theme={'dark'} {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    return waitFor.assert(() => expect(driver.hasDarkTheme()).toBeTruthy());
  });

  it('should support light theme', () => {
    const driver = createDriver(<Tooltip theme={'light'} {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    return waitFor.assert(() => expect(driver.hasLightTheme()).toBeTruthy());
  });

  it('should have children', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    expect(driver.getChildren()).toContain('foo children');
  });

  it('should have a content', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    return waitFor.assert(() => expect(driver.getContent()).toEqual('<div>Some content</div>'));
  });

  it('should cancel mouse leave, when followed by mouse enter immediately', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    driver.mouseLeave();
    driver.mouseEnter();

    return waitFor.assert(() => expect(driver.isShown()).toBe(true));
  });

  it('should call onShow when tooltip is shown', () => {
    const onShow = jest.fn();
    const driver = createDriver(<Tooltip {...{..._props, onShow}}>{children}</Tooltip>);

    driver.mouseEnter();

    expect(onShow).not.toHaveBeenCalled();
    return waitFor.assert(() => expect(onShow).toHaveBeenCalled());
  });

  describe('placement attribute', () => {
    it('should be top by default', () => {
      const driver = createDriver(<Tooltip {...{..._props}}>{children}</Tooltip>);
      driver.mouseEnter();

      return waitFor.assert(() => expect(driver.getPlacement()).toEqual('top'));
    });

    ['top', 'bottom', 'left', 'right'].forEach(placement => {
      it(`should be ${placement}`, () => {
        const driver = createDriver(<Tooltip {...{..._props}} placement={placement}>{children}</Tooltip>);
        driver.mouseEnter();

        return waitFor.assert(() => expect(driver.getPlacement()).toBe(placement));
      });
    });

    it('show with delay and immediately hide', () => {
      const driver = createDriver(<Tooltip {...{..._props, hideDelay: 0, showDelay: 50}}>{children}</Tooltip>);
      driver.mouseEnter();
      driver.mouseLeave();

      return waitFor.assertHold(() => expect(driver.isShown()).toBeFalsy());
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Tooltip dataHook={dataHook} {..._props}>{children}</Tooltip></div>));
      const driver = tooltipTestkitFactory({wrapper, dataHook});
      driver.mouseEnter();
      expect(driver.isShown()).toBeFalsy();
      return waitFor.assert(() => expect(driver.isShown()).toBeTruthy());
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Tooltip dataHook={dataHook} {..._props}>{children}</Tooltip>);
      const driver = enzymeTooltipTestkitFactory({wrapper, dataHook});
      driver.mouseEnter();
      expect(driver.isShown()).toBeFalsy();
      return waitFor.assert(() => expect(driver.isShown()).toBeTruthy());
    });

    it.skip('should remove a tooltip immediately once the component is destroyed', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Tooltip dataHook={dataHook} {..._props} hideDelay={1000}>{children}</Tooltip>);
      const driver = enzymeTooltipTestkitFactory({wrapper, dataHook});
      driver.mouseEnter();
      return waitFor.assert(() => expect(driver.isShown()).toBeTruthy())
      .then(() => {
        wrapper.unmount();
        expect(driver.isShown()).toBeFalsy();
      });
    });
  });
});

function waitFor(predicate, msg) {
  return waitForCond(predicate, 2000, msg);
}

waitFor.assert = function (fn) {
  return waitForCond.assert(fn, 2000);
};

waitFor.assertHold = function (fn) {
  return waitForCond.assertHold(fn, 500);
};
