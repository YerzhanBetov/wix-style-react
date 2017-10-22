import React from 'react';
import MessageBoxMarketerialLayout from './MessageBoxMarketerialLayout';
import MessageBoxMarketerialLayoutFactory from './MessageBoxMarketerialLayout.driver';
import {createDriverFactory} from '../test-common';
import sinon from 'sinon';
import {isTestkitExists, isEnzymeTestkitExists} from '../../testkit/test-common';
import {messageBoxMarketerialLayoutTestkitFactory} from '../../testkit';
import {messageBoxMarketerialLayoutTestkitFactory as enzymeMessageBoxTestkitFactory} from '../../testkit/enzyme';

describe('MessageBoxMarketerialLayout', () => {
  const createDriver = createDriverFactory(MessageBoxMarketerialLayoutFactory);
  const requiredProps = {
    title: 'title',
    content: <div/>,
    onClose: () => {}
  };

  describe('action buttons', () => {
    it('should display the primary button label text on top the primary button', () => {
      const props = Object.assign({}, requiredProps, {
        primaryButtonLabel: 'primaryButtonLabel'
      });
      const driver = createDriver(<MessageBoxMarketerialLayout {...props}/>);
      expect(driver.getPrimaryButtonText()).toBe(props.primaryButtonLabel);
    });

    it('should not display the primary button if primary button label was not passed', () => {
      const props = Object.assign({}, requiredProps, {
      });
      const driver = createDriver(<MessageBoxMarketerialLayout {...props}/>);
      expect(driver.getPrimaryButton()).toBeNull();
    });

    it('should display the secondary button label text on top the secondary button', () => {
      const props = Object.assign({}, requiredProps, {
        secondaryButtonLabel: 'secondaryButtonLabel'
      });
      const driver = createDriver(<MessageBoxMarketerialLayout {...props}/>);
      expect(driver.getSecondaryButtonText()).toBe(props.secondaryButtonLabel);
    });

    it('should not display the secondary button if secondary button label was not passed', () => {
      const props = Object.assign({}, requiredProps, {
      });
      const driver = createDriver(<MessageBoxMarketerialLayout {...props}/>);
      expect(driver.getSecondaryButton()).toBeNull();
    });

    it(`should trigger the primary button action upon clicking the primary button`, () => {
      const props = Object.assign({}, requiredProps, {
        onPrimaryButtonClick: sinon.spy(),
        primaryButtonLabel: 'primaryButtonLabel'
      });
      const driver = createDriver(<MessageBoxMarketerialLayout {...props}/>);
      driver.clickOnPrimaryButton();
      expect(props.onPrimaryButtonClick.calledOnce).toBeTruthy();
    });

    it(`should trigger the secondary button action upon clicking the secondary button`, () => {
      const props = Object.assign({}, requiredProps, {
        onSecondaryButtonClick: sinon.spy(),
        secondaryButtonLabel: 'secondaryButtonLabel'
      });
      const driver = createDriver(<MessageBoxMarketerialLayout {...props}/>);
      driver.clickOnSecondaryButton();
      expect(props.onSecondaryButtonClick.calledOnce).toBeTruthy();
    });

    it(`should close the message dialog upon clicking the close button`, () => {
      const props = Object.assign({}, requiredProps, {
        onClose: sinon.spy()
      });
      const driver = createDriver(<MessageBoxMarketerialLayout {...props}/>);
      driver.closeMessageBox();
      expect(props.onClose.calledOnce).toBeTruthy();
    });
  });

  describe('general', () => {
    it(`should render title`, () => {
      const props = Object.assign({}, requiredProps, {
        title: 'title'
      });
      const driver = createDriver(<MessageBoxMarketerialLayout {...props}/>);
      expect(driver.getTitle()).toBe(props.title);
    });

    it(`should render the passed content in the markup`, () => {
      const props = Object.assign({}, requiredProps, {
        content: <div data-hook="inner-div"/>
      });
      const driver = createDriver(<MessageBoxMarketerialLayout {...props}/>);
      expect(driver.getContentBySelector('[data-hook="inner-div"]')).not.toBeNull();
    });

    it(`should render image from given imageUrl`, () => {
      const props = Object.assign({}, requiredProps, {
        imageUrl: 'http://www.domstechblog.com/wp-content/uploads/2015/09/wix.png'
      });
      const driver = createDriver(<MessageBoxMarketerialLayout {...props}/>);
      expect(driver.getImageSrc()).toBe(props.imageUrl);
    });

    it(`should render image from given component`, () => {
      const props = Object.assign({}, requiredProps, {
        imageComponent: <div data-hook="image-component-test"/>
      });
      const driver = createDriver(<MessageBoxMarketerialLayout {...props}/>);
      expect(driver.getContentBySelector('[data-hook="image-component-test"]')).not.toBeNull();
    });

    it(`should use default color theme (blue) if none was passed`, () => {
      const props = Object.assign({}, requiredProps, {
        primaryButtonLabel: 'primaryButtonLabel'
      });
      const driver = createDriver(<MessageBoxMarketerialLayout {...props}/>);
      expect(driver.getPrimaryButton().className).toContain('fullblue');
    });

    it(`should use color theme`, () => {
      const props = Object.assign({}, requiredProps, {
        primaryButtonLabel: 'primaryButtonLabel',
        theme: 'purple'
      });
      const driver = createDriver(<MessageBoxMarketerialLayout {...props}/>);
      expect(driver.getPrimaryButton().className).toContain('fullpurple');
    });

  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<MessageBoxMarketerialLayout {...requiredProps}/>, messageBoxMarketerialLayoutTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<MessageBoxMarketerialLayout {...requiredProps}/>, enzymeMessageBoxTestkitFactory)).toBe(true);
    });
  });
});
