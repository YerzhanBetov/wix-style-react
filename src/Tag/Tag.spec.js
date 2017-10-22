import React from 'react';
import Tag from './Tag';
import tagDriverFactory from './Tag.driver';
import {createDriverFactory} from '../test-common';
import {tagTestkitFactory} from '../../testkit';
import {tagTestkitFactory as enzymeTagTestkitFactory} from '../../testkit/enzyme';
import {isTestkitExists, isEnzymeTestkitExists} from '../../testkit/test-common';

describe('Tag', () => {

  const createDriver = createDriverFactory(tagDriverFactory);
  const id = 'myId', label = 'Hey', onRemove = jest.fn();

  it('should have a default small size', () => {
    const driver = createDriver(<Tag id={id}>{label}</Tag>);
    expect(driver.isLarge()).toBeFalsy();
  });

  it('should have a large size', () => {
    const driver = createDriver(<Tag id={id} size="large">{label}</Tag>);
    expect(driver.isLarge()).toBeTruthy();
  });

  it('should have a label', () => {
    const driver = createDriver(<Tag id={id}>{label}</Tag>);
    expect(driver.getLabel()).toBe(label);
  });

  it('should be removable by default', () => {
    const driver = createDriver(<Tag id={id}>{label}</Tag>);
    expect(driver.isRemovable()).toBeTruthy();
  });

  it('should not be removable', () => {
    const driver = createDriver(<Tag id={id} removable={false}>{label}</Tag>);
    expect(driver.isRemovable()).toBeFalsy();
  });

  it('should have not remove button if disabled is true', () => {
    const driver = createDriver(<Tag id={id} disabled>{label}</Tag>);
    expect(driver.isRemovable()).toBeFalsy();
  });

  it('should have disabled class if disabled is true', () => {
    const driver = createDriver(<Tag id={id} disabled>{label}</Tag>);
    expect(driver.isDisabled()).toBeTruthy();
  });

  it('should call onRemove function on remove', () => {
    const driver = createDriver(<Tag id={id} onRemove={onRemove}>{label}</Tag>);

    driver.removeTag();
    expect(onRemove).toBeCalledWith(id);
  });

  it('should not display thumb by default', () => {
    const driver = createDriver(<Tag id={id}>{label}</Tag>);
    expect(driver.isThumbExists()).toBeFalsy();
  });

  it('should display thumb', () => {
    const driver = createDriver(<Tag id={id} thumb={<span>Ho</span>}>{label}</Tag>);
    expect(driver.isThumbExists()).toBeTruthy();
  });

  it('should wrap label text', () => {
    const longLabel = 'Very very very very very very very very long label';
    const driver = createDriver(<Tag id={id} wrap>{longLabel}</Tag>);

    expect(driver.getTitle()).toBe(longLabel);
    expect(driver.getLabel()).toBe(longLabel);
    expect(driver.isWrapped()).toBe(true);
  });

  describe('theme attribute', () => {
    it('should have standard theme by default', () => {
      const driver = createDriver(<Tag id={id}>a</Tag>);
      expect(driver.isStandardTheme()).toBe(true);
    });

    it('should have warning theme', () => {
      const driver = createDriver(<Tag id={id} theme="warning">a</Tag>);
      expect(driver.isWarningTheme()).toBe(true);
    });

    it('should have error theme', () => {
      const driver = createDriver(<Tag id={id} theme="error">a</Tag>);
      expect(driver.isErrorTheme()).toBe(true);
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      const id = 'hello';
      expect(isTestkitExists(<Tag id={id}>a</Tag>, tagTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const id = 'hello';
      expect(isEnzymeTestkitExists(<Tag id={id}>a</Tag>, enzymeTagTestkitFactory)).toBe(true);
    });
  });
});
