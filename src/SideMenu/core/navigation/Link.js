import React from 'react';
import {bool, node, string} from 'prop-types';
import LinkLayout from './LinkLayout';
import styles from './styles.scss';
import DataPickerArrow from '../../../Icons/dist/components/DataPickerArrow';

const Link = ({children, isDiminishedHover, isActive, withArrow, badge, dataHook, ...rest}) =>
  <LinkLayout isDiminishedHover={isDiminishedHover} isActive={isActive}>
    <a data-hook={dataHook} {...rest}>
      {children}
      {badge}
      {withArrow && <span className={styles.linkArrow}><DataPickerArrow/></span>}
    </a>
  </LinkLayout>;

Link.defaultProps = {
  dataHook: 'menu-navigation-link',
  withArrow: false
};

Link.propTypes = {
  children: node,
  isActive: bool,
  withArrow: bool,
  badge: node,
  isDiminishedHover: bool,
  dataHook: string
};

export default Link;
