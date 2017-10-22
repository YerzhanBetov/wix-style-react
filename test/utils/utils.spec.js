import {isClassExists} from './utils';

describe('test-utils', () => {
  describe('isClassExists function', () => {
    const classes = 'class class2 class3';
    const element = {className: classes};

    classes.split(' ').forEach(className =>
      it(`should return true for className ${className}`, () => {
        expect(isClassExists(element, className)).toBe(true);
      })
    );

    [undefined, 'cla', 'class4'].forEach(className =>
      it(`should return false for className ${className}`, () => {
        expect(isClassExists(element, className)).toBe(false);
      })
    );
  });
});
