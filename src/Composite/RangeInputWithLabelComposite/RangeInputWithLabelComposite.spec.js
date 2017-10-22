import React from 'react';
import RangeInputWithLabelComposite from './RangeInputWithLabelComposite';
import Label from '../../Label';
import Input from '../../Input';
import rangeCompositeDriverFactory from './RangeWithLabelComposite.driver';
import {createDriverFactory} from '../../test-common';

describe('RangeInputWithLabelComposite', () => {
  const createRangeCompositeDriver = createDriverFactory(rangeCompositeDriverFactory);

  it('should remove label wrapping when label not given', () => {
    const driver = createRangeCompositeDriver(<RangeInputWithLabelComposite><Input/><Input/></RangeInputWithLabelComposite>);
    expect(driver.hasLabel()).toBe(false);
    expect(driver.getNumberOfChildren()).toBe(2);
  });

  it('should render Label with 2 Inputs', () => {
    const driver = createRangeCompositeDriver(<RangeInputWithLabelComposite><Label>myLabel</Label><Input/><Input/></RangeInputWithLabelComposite>);
    expect(driver.hasLabel()).toBe(true);
    expect(driver.getLabel()).toBe('myLabel');
    expect(driver.hasInputs()).toBe(true);
  });

  describe('label attributes', () => {
    it('should FieldLabelAttributes not exists if all attributes empty or false', () => {
      const driver = createRangeCompositeDriver(<RangeInputWithLabelComposite><Label>myLabel</Label><Input/><Input/></RangeInputWithLabelComposite>);

      expect(driver.hasFieldLabelAttributes()).toBe(false);
    });

    it('should FieldLabelAttributes exists if required', () => {
      const driver = createRangeCompositeDriver(<RangeInputWithLabelComposite required><Label>myLabel</Label><Input/><Input/></RangeInputWithLabelComposite>);

      expect(driver.hasFieldLabelAttributes()).toBe(true);
    });

    it('should FieldLabelAttributes exists if info', () => {
      const driver = createRangeCompositeDriver(<RangeInputWithLabelComposite info="info"><Label>myLabel</Label><Input/><Input/></RangeInputWithLabelComposite>);

      expect(driver.hasFieldLabelAttributes()).toBe(true);
    });
  });

});
