import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';

import {createDriverFactory} from '../test-common';
import {breadcrumbsTestkitFactory} from '../../testkit';
import {breadcrumbsTestkitFactory as enzymeBreadcrumbsTestkitFactory} from '../../testkit/enzyme';
import breadcrumbsDriverFactory from './Breadcrumbs.driver';

import Breadcrumbs from './Breadcrumbs';

describe('Breadcrumbs', () => {
  const createDriver = createDriverFactory(breadcrumbsDriverFactory);
  const items = [
    {id: 0, value: 'Option 1'},
    {id: 1, value: 'Option 2'}
  ];
  let onClick;
  let driver;

  function createComponent(props) {
    driver = createDriver(<Breadcrumbs {...props}/>);
  }

  beforeEach(() => {
    onClick = jest.fn();
  });

  it('should have correct text on each breadcrumb', () => {
    createComponent({onClick, items});
    expect(driver.breadcrumbsLength()).toBe(items.length);
    expect(driver.breadcrumbContentAt(0)).toBe(items[0].value);
    expect(driver.breadcrumbContentAt(1)).toBe(items[1].value);
  });

  it('should call onClick callback on click with correct item', () => {
    createComponent({onClick, items});
    const itemIndex = 1;

    driver.clickBreadcrumbAt(itemIndex);
    expect(onClick).toBeCalledWith({id: items[itemIndex].id, value: 'Option 2'});
  });

  it('should get correct size from props', () => {
    const size = 'large';
    createComponent({onClick, items, size});
    expect(driver.isLarge()).toBe(true);
  });

  it('should use medium size as default', () => {
    createComponent({onClick, items});
    expect(driver.isMedium()).toBe(true);
  });

  it('should get theme from props', () => {
    const theme = 'onWhiteBackground';
    createComponent({onClick, items, theme});
    expect(driver.isOnWhiteBackground()).toBe(true);
  });

  it('should use default theme gray background', () => {
    createComponent({onClick, items});
    expect(driver.isOnGrayBackground()).toBe(true);
  });

  it('should get active id from props and have correct class', () => {
    const itemIndex = 1;
    createComponent({onClick, items, activeId: items[itemIndex].id});
    expect(driver.getActiveItemId()).toBe(itemIndex);
  });

  it('should return null if not exists active id', () => {
    createComponent({onClick, items});
    expect(driver.getActiveItemId()).toBe(null);
  });

  describe('label appearance', () => {
    const itemIndex = 0;
    const activeItemIndex = 1;
    const activeId = items[activeItemIndex].id;

    describe('medium size', () => {
      const size = 'medium';

      it('should have t3.1 appearance when onWhiteBackground style and t3 for active', () => {
        const theme = 'onWhiteBackground';
        createComponent({onClick, items, theme, size, activeId});
        expect(driver.getLabelClassList(itemIndex)).toContain('t3_1');
        expect(driver.getLabelClassList(activeItemIndex)).toContain('t3');
      });

      it('should have t3.1 appearance when onGrayBackground style and t3 for active', () => {
        const theme = 'onGrayBackground';
        createComponent({onClick, items, theme, size, activeId});
        expect(driver.getLabelClassList(itemIndex)).toContain('t3_1');
        expect(driver.getLabelClassList(activeItemIndex)).toContain('t3');
      });

      it('should have t3.2 appearance when onDarkBackground style', () => {
        const theme = 'onDarkBackground';
        createComponent({onClick, items, theme, size, activeId});
        expect(driver.getLabelClassList(itemIndex)).toContain('t3_2');
      });
    });

    describe('large size', () => {
      const size = 'large';

      it('should have t1.1 appearance when onWhiteBackground style and t1 for active', () => {
        const theme = 'onWhiteBackground';
        createComponent({onClick, items, theme, size, activeId});
        expect(driver.getLabelClassList(itemIndex)).toContain('t1_1');
        expect(driver.getLabelClassList(activeItemIndex)).toContain('t1');
      });

      it('should have t1.1 appearance when onWhiteBackground style and t1 for active', () => {
        const theme = 'onGrayBackground';
        createComponent({onClick, items, theme, size, activeId});
        expect(driver.getLabelClassList(itemIndex)).toContain('t1_1');
        expect(driver.getLabelClassList(activeItemIndex)).toContain('t1');
      });

      it('should have t1.2 appearance when onDarkBackground style', () => {
        const theme = 'onDarkBackground';
        createComponent({onClick, items, theme, size, activeId});
        expect(driver.getLabelClassList(itemIndex)).toContain('t1_2');
      });
    });
  });

  describe('item with link attribute', () => {
    const linkItems = [
      {id: 0, value: 'Option 1', link: '//www.wix.com'},
      {id: 1, value: 'Option 2', link: '//www.facebook.com'}
    ];

    it('should not have links if link attribute is not given', () => {
      createComponent({items});
      expect(driver.isActiveLinkAt(0)).toBe(false);
      expect(driver.isActiveLinkAt(1)).toBe(false);
    });

    it('should be a link if no activeId is given', () => {
      createComponent({items: linkItems});
      expect(driver.isActiveLinkAt(0)).toBe(true);
      expect(driver.isActiveLinkAt(1)).toBe(true);
    });

    it('should not be a link if it is the item with activeId', () => {
      createComponent({items: linkItems, activeId: 0});
      expect(driver.isActiveLinkAt(0)).toBe(false);
      expect(driver.isActiveLinkAt(1)).toBe(true);
    });
  });

  describe('customElement attribute', () => {
    const customItems = [
      {id: 0, value: 'Option 1', customElement: <a href="//www.wix.com">Option 1</a>},
      {id: 1, value: 'Option 2', customElement: <a href="//www.facebook.com">Option 2</a>}
    ];

    const customItemsWithLinks = [
      {id: 0, value: 'value', customElement: <a href="//www.wix.com">Custom value</a>, link: 'www.bla.com'}
    ];

    it('should render the customElement when given', () => {
      createComponent({items: customItems});

      expect(driver.breadcrumbsLength()).toBe(customItems.length);
      expect(driver.breadcrumbContentAt(0)).toBe(customItems[0].value);
      expect(driver.breadcrumbContentAt(1)).toBe(customItems[1].value);
    });

    it('should render the customElement even if link attribute is given', () => {

      createComponent({items: customItemsWithLinks});

      expect(driver.breadcrumbsLength()).toBe(customItemsWithLinks.length);
      expect(driver.breadcrumbContentAt(0)).toBe('Custom value');
    });

    it('should render the value attribute of the item when this is the activeId', () => {
      createComponent({items: customItemsWithLinks, activeId: 0});

      expect(driver.breadcrumbContentAt(0)).toBe(customItemsWithLinks[0].value);
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Breadcrumbs onClick={onClick} items={items} dataHook={dataHook}/></div>));
      const breadcrumbsTestkit = breadcrumbsTestkitFactory({wrapper, dataHook});
      expect(breadcrumbsTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Breadcrumbs onClick={onClick} items={items} dataHook={dataHook}/>);
      const breadcrumbsTestkit = enzymeBreadcrumbsTestkitFactory({wrapper, dataHook});
      expect(breadcrumbsTestkit.exists()).toBeTruthy();
    });
  });
});
