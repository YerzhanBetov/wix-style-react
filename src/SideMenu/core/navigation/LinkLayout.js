import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

const LinkLayout = ({children, isDiminishedHover, isActive, disabled, ...rest}) =>
  <span
    className={classnames(styles.linkLayout, {
      [styles.linkActive]: isActive,
      [styles.linkDiminishedHover]: isDiminishedHover,
      [styles.linkDisabled]: disabled
    })}
    data-hook="menu-navigation-link-wrapper"
    {...rest}
    >
    {children}
  </span>;

LinkLayout.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  isDiminishedHover: PropTypes.bool,
  disabled: PropTypes.bool
};

export default LinkLayout;
