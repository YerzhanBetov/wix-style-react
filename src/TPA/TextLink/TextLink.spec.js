import React from 'react';
import textLinkDriverFactory from './TextLink.driver';
import TextLink from './TextLink';
import {createDriverFactory} from '../../test-common';
import {tpaTextLinkTestkitFactory as textLinkTestkitFactory} from '../../../testkit';
import {tpaTextLinkTestkitFactory as enzymeTextLinkTestkitFactory} from '../../../testkit/enzyme';
import {isTestkitExists, isEnzymeTestkitExists} from '../../../testkit/test-common';

describe('TextLink', () => {

  const createDriver = createDriverFactory(textLinkDriverFactory);

  it('should have a textLink', () => {
    const driver = createDriver(<TextLink link=""/>);

    expect(driver.exists()).toBeTruthy();
  });

  it('should render children', () => {
    const children = '<div>123</div>';
    const driver = createDriver(<TextLink link="">{children}</TextLink>);

    expect(driver.getTextContent()).toBe(children);
  });

});

describe('testkit', () => {
  it('should exist', () => {
    expect(isTestkitExists(<TextLink link=""/>, textLinkTestkitFactory)).toBe(true);
  });
});

describe('enzyme testkit', () => {
  it('should exist', () => {
    expect(isEnzymeTestkitExists(<TextLink link=""/>, enzymeTextLinkTestkitFactory)).toBe(true);
  });
});
