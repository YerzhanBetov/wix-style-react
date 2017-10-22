import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import textDriverFactory from './Text.driver';
import {createDriverFactory} from '../test-common';
import {textTestkitFactory} from '../../testkit';
import {textTestkitFactory as enzymeTextTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

import Text from './Text';
import styles from './styles.scss';
import typography from '../Typography';

describe('Component: Text', () => {
  const createDriver = createDriverFactory(textDriverFactory);

  it('should render content in `span` tag', () => {
    const driver = createDriver(<Text>zombo</Text>);
    expect(driver.getType()).toBe('span');
    expect(driver.getText()).toBe('zombo');
  });

  describe('when `appearance` prop is a heading', () => {
    it('should render correct H tag', () => {
      const appearancesAndTypes = [
        ['H0', 'h1'],
        ['H1', 'h2'],
        ['H2', 'h3'],
        ['H2.1', 'h3'],
        ['H3', 'h4'],
        ['H4', 'h5']
      ];

      appearancesAndTypes.map(([appearance, type]) => {
        const driver = createDriver(<Text appearance={appearance}/>);
        return expect(driver.getType()).toBe(type);
      });
    });

    it('should have correct className', () => {
      const appearancesAndClassNames = [
        ['H0', typography.h0],
        ['H1', typography.h1],
        ['H2', typography.h2],
        ['H2.1', typography.h2_1],
        ['H3', typography.h3],
        ['H4', typography.h4]
      ];

      appearancesAndClassNames.map(([appearance, className]) => {
        const driver = createDriver(<Text appearance={appearance}/>);
        return expect(driver.getClassName()).toEqual(`${className} ${styles.headingDefaults}`);
      });
    });
  });

  describe('when `appearance` prop is a T', () => {
    it('should render span', () => {
      [
        'T1', 'T1.1', 'T1.2', 'T1.3', 'T1.4',
        'T2', 'T2.1', 'T2.2', 'T2.3',
        'T3', 'T3.1', 'T3.2', 'T3.3', 'T3.4',
        'T4', 'T4.1', 'T4.2', 'T4.3',
        'T5', 'T5.1'
      ].map(appearance => {
        const driver = createDriver(<Text appearance={appearance}/>);
        return expect(driver.getType()).toBe('span');
      });
    });
  });

  describe('ellipsis prop', () => {
    it('should not have ellipsis by default', () => {
      const driver = createDriver(<Text>zombo</Text>);
      expect(driver.hasEllipsis()).toBe(false);
    });

    it('should have ellipsis', () => {
      const driver = createDriver(<Text ellipsis>zombo</Text>);
      expect(driver.hasEllipsis()).toBe(true);
    });

    it('should not have title attribute when not given ellipsis prop', () => {
      const driver = createDriver(<Text>zombo</Text>);
      expect(driver.getTitle()).toBe('');
    });

    it('should not have title attribute when given ellipsis and forceHideTitle props', () => {
      const driver = createDriver(<Text ellipsis forceHideTitle>zombo</Text>);
      expect(driver.getTitle()).toBe('');
    });

    it('should not have title attribute when given ellipsis prop but none string children', () => {
      const driver = createDriver(<Text ellipsis><span>zombo</span></Text>);
      expect(driver.getTitle()).toBe('');
    });

    it('should have title attribute when given ellipsis prop', () => {
      const driver = createDriver(<Text ellipsis>zombo</Text>);
      expect(driver.getTitle()).toBe('zombo');
    });
  });
});

describe('testkit', () => {
  it('should create new driver', () => {
    const div = document.createElement('div');
    const dataHook = 'myDataHook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Text dataHook={dataHook} appearance="H0"/></div>));
    const textTestkit = textTestkitFactory({wrapper, dataHook});
    expect(textTestkit.getType()).toBe('h1');
  });
});

describe('enzyme testkit', () => {
  it('should create new driver', () => {
    const dataHook = 'myDataHook';
    const wrapper = mount(<Text dataHook={dataHook} appearance="T1">zombo</Text>);
    const textTestkit = enzymeTextTestkitFactory({wrapper, dataHook});
    expect(textTestkit.getText()).toBe('zombo');
  });
});
