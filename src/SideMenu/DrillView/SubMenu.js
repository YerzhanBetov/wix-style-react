import SideMenuDrill from './index';
import React, {Children} from 'react';
import styles from './DrillView.scss';
import Navigation from '../core/navigation';
import {node, string, bool, func} from 'prop-types';
import NavigationLink from '../core/navigation/Link';
import NavigationBackLink from '../core/navigation/BackLink';
import NavigationCategory from '../core/navigation/Category';

const SubMenu = ({children, title, isOpen, isActive, onSelectHandler, onBackHandler, backLabel, showCategory, badge, linkDataHook}) => {
  if (!isOpen) {

    return (
      <NavigationLink isActive={isActive} onClick={onSelectHandler} badge={badge} withArrow={!badge} data-hook={linkDataHook}>
        {title}
      </NavigationLink>
    );
  }

  const wrappedNavigation = Children.map(children, child => {
    if (child.type === SideMenuDrill.Navigation) {
      return (
        <div className={styles.openSubMenu}>
          <NavigationBackLink onBackHandler={onBackHandler}>{backLabel}</NavigationBackLink>
          {showCategory && <NavigationCategory>{title}</NavigationCategory>}
          <Navigation>
            {child.props.children}
          </Navigation>
        </div>
      );
    }

    return child;
  });

  return (
    <div className={styles.subMenu} data-hook="menu-drill-sub-menu">
      {wrappedNavigation}
    </div>
  );
};

SubMenu.defaultProps = {
  isActive: false,
  isOpen: false,
  onSelectHandler: () => {},
  onBackHandler: () => {},
  backLabel: 'Back',
  showCategory: true,
  linkDataHook: 'menu-drill-sub-menu-link'
};

SubMenu.propTypes = {
  menuKey: string.isRequired,
  title: string.isRequired,
  isActive: bool,
  isOpen: bool,
  onSelectHandler: func,
  onBackHandler: func,
  backLabel: string,
  showCategory: bool,
  badge: node,
  linkDataHook: string,
  children: node.isRequired
};

export default SubMenu;
