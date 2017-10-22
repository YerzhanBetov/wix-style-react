import React from 'react';
import fieldLabelAttributesDriverFactory from './FieldLabelAttributes.driver';
import {createDriverFactory} from '../test-common';
import FieldLabelAttributes from './FieldLabelAttributes';

describe('FieldLabelAttributes', () => {

  const createDriver = createDriverFactory(fieldLabelAttributesDriverFactory);

  describe('required', () => {
    it('should not exist by default', () => {
      const driver = createDriver(<FieldLabelAttributes/>);
      expect(driver.hasRequired()).toBe(false);
    });

    it('should exist', () => {
      const driver = createDriver(<FieldLabelAttributes required/>);
      expect(driver.hasRequired()).toBe(true);
    });
  });

  describe('info', () => {
    it('should not exist by default', () => {
      const driver = createDriver(<FieldLabelAttributes/>);
      expect(driver.hasInfo()).toBe(false);
    });

    it('should exist', () => {
      const driver = createDriver(<FieldLabelAttributes info="help me bla bla"/>);
      expect(driver.hasInfo()).toBe(true);
    });
  });

});
