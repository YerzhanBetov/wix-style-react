import React from 'react';
import styles from './styles.scss';

class Badge extends React.Component {
  render() {
    const {...rest} = this.props;
    return <span className={styles.linkBadge} data-hook="menu-navigation-badge" {...rest}/>;
  }
}

export default Badge;
