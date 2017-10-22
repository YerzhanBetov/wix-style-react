import React, {Component} from 'react';
import PropTypes from 'prop-types';

import reactElementToJSXString from 'react-element-to-jsx-string';
import PopoverMenu from '../../../src/PopoverMenu';
import PopoverMenuItem from '../../../src/PopoverMenuItem';
import {
  POPOVER_MENU_DATA_HOOK,
  POPOVER_MENU_ITEM_DATA_HOOK
} from './PopoverMenuTemplate.helpers';
import * as Icons from 'wix-style-react/Icons';

class PopoverMenuTemplate extends Component {

  static propTypes = {
    menuItems: PropTypes.array.isRequired,
    size: PopoverMenu.propTypes.size,
    placement: PopoverMenu.propTypes.placement,
    onChange: PropTypes.func,
    maxWidth: PopoverMenu.propTypes.maxWidth,
    buttonTheme: PropTypes.any
  };

  componentDidUpdate(props) {
    props.onChange(this.getExampleCode());
  }

  componentDidMount() {
    this.props.onChange(this.getExampleCode());
  }

  getExampleCode() {
    return reactElementToJSXString(this.getComponent(), {
      showDefaultProps: false
    });
  }

  getComponent() {
    return (
      <PopoverMenu
        dataHook={POPOVER_MENU_DATA_HOOK}
        size={this.props.size}
        placement={this.props.placement}
        buttonTheme={this.props.buttonTheme}
        maxWidth={this.props.maxWidth}
        >
        {
          this.props.menuItems.filter(menuItem => menuItem.iconName).map((menuItem, i) => (
            <PopoverMenuItem
              dataHook={POPOVER_MENU_ITEM_DATA_HOOK}
              key={i}
              icon={React.createElement(Icons[menuItem.iconName])}
              text={menuItem.text}
              onClick={() => console.log(`menu item ${i} clicked`)}
              />
          ))
        }
      </PopoverMenu>
    );
  }

  render() {
    return this.getComponent();
  }
}

export default PopoverMenuTemplate;
