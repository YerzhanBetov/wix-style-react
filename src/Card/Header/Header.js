import React from 'react';
import {bool, node} from 'prop-types';
import classNames from 'classnames';
import styles from './Header.scss';
import WixComponent from '../../BaseComponents/WixComponent';

class Header extends WixComponent {

  static propTypes = {
    title: node.isRequired,
    subtitle: node,
    withoutDivider: bool,
    suffix: node
  };

  static defaultProps = {
    subtitle: null,
    suffix: null,
    withoutDivider: false
  };

  render() {
    const {title, subtitle, withoutDivider, suffix} = this.props;

    const headerClasses = classNames({
      [styles.header]: true,
      [styles.withDivider]: !withoutDivider
    });

    const titleElement = (
      <div data-hook="title" className={styles.title}>
        {title}
      </div>
    );

    const subtitleElement = subtitle ? (
      <div data-hook="subtitle" className={styles.subtitle}>
        {subtitle}
      </div>
    ) : null;

    const suffixElement = suffix ? (
      <div data-hook="suffix">
        {suffix}
      </div>
    ) : null;

    return (
      <div className={headerClasses}>
        <div className={styles.container}>
          {titleElement}
          {subtitleElement}
        </div>
        {suffixElement}
      </div>
    );
  }
}

export default Header;
