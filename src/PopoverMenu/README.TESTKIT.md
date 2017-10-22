# PopoverMenu component

### TestKit API
| scope | method | arguments | return type |
|-------|--------|-----------|----------------|
| Protractor | element | - | ElementFinder  |
| * | exists | - | boolean |
| * | click | - | -  |
| * | init.menuItemDataHook | dataHook: string | - |
| Protractor | menu.element | - | ElementFinder |
| * | menu.isShown | - | boolean  |
| * | menu.itemsLength | - | integer  |
| * | menu.itemContentAt | itemIndex: integer | string |
| * | menu.clickItemAt | itemIndex: integer | - |


## Usage Example

### Unit testing example
```javascript
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import waitForCond from 'wait-for-cond';
import {mount} from 'enzyme';

import {popoverMenuTestkitFactory} from '../../testkit';
import {popoverMenuTestkitFactory as enzymePopoverMenuTestkitFactory} from '../../testkit/enzyme';

import PopoverMenu from './PopoverMenu';
import PopoverMenuItem from '../PopoverMenuItem/PopoverMenuItem';

const waitFor = fn => waitForCond.assert(fn, 2000);

afterEach(() => {
  // under the hood PopoverMenu uses Tooltip component, which renders straight into document.body
  // thus need to keep it maintained
  document.body.innerHTML = '';
});

describe('Using ReactTestUtils testkit', () => {
  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const menuItemDataHook = 'myItemDataHook';
  const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
    <div>
      <PopoverMenu dataHook={dataHook}>
        <PopoverMenuItem
          dataHook={menuItemDataHook}
          text="Menu Item #1"
          />
        <PopoverMenuItem
          dataHook={menuItemDataHook}
          text="Menu Item #2"
          />
      </PopoverMenu>
    </div>
  ));
  const testkit = popoverMenuTestkitFactory({wrapper, dataHook})
    .init.menuItemDataHook(menuItemDataHook);

  it('should show menu on trigger click', async () => {
    testkit.click();

    await waitFor(() => {
      expect(testkit.menu.isShown()).toBe(true);
    });
  });
});

describe('Using Enzyme testkit', () => {
  const dataHook = 'myDataHook';
  const menuItemDataHook = 'myItemDataHook';
  const wrapper = mount(
    <PopoverMenu dataHook={dataHook}>
      <PopoverMenuItem
        dataHook={menuItemDataHook}
        text="Menu Item #1"
        />
      <PopoverMenuItem
        dataHook={menuItemDataHook}
        text="Menu Item #2"
        />
    </PopoverMenu>
  );
  const testkit = enzymePopoverMenuTestkitFactory({wrapper, dataHook})
    .init.menuItemDataHook(menuItemDataHook);

  it('should show menu on trigger click', async () => {
    testkit.click();

    await waitFor(() => {
      expect(testkit.menu.isShown()).toBe(true);
    });
  });
});
```
### E2E testing example
```javascript
import {
    popoverMenuTestkitFactory,
    waitForVisibilityOf,
} from '../../testkit/protractor';

describe('Using Protractor testkit', () => {
  let driver;

  beforeEach(() => {
    driver = popoverMenuTestkitFactory({dataHook: 'myDataHook'})
      .init.menuItemDataHook('myItemDataHook');
  });

  it('should show menu on trigger click', () => {
    waitForVisibilityOf(driver.element(), 'Oops, no trigger element').then(() => {
      driver.click();

      waitForVisibilityOf(driver.menu.element(), 'Oops, no menu element');
    });
  });
});
```