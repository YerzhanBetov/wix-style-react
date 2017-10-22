import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
import styles from './Tabs.scss';

class Tabs extends WixComponent {
  render() {
    const {items, onClick, activeId, type, hasDivider, width} = this.props;
    const style = {};
    const tabs = items.map(item => {
      const className = classNames(styles.tab, {
        [styles.active]: item.id === activeId
      });

      if (type === 'uniformSide') {
        style.width = width;
      }

      return (
        <li key={item.id} onClick={() => onClick(item)} className={className} style={style}>
          {item.title}
        </li>
      );
    });
    const className = classNames(styles[type], styles.container, {
      [styles.hasDivider]: hasDivider
    });

    return <ul className={className}>{tabs}</ul>;
  }
}

Tabs.tabTypes = ['compact', 'uniformSide', 'uniformFull'];

Tabs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]).isRequired
  })).isRequired,
  onClick: PropTypes.func,
  activeId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  type: PropTypes.oneOf(Tabs.tabTypes),
  hasDivider: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Tabs.defaultProps = {
  hasDivider: true
};

export default Tabs;
