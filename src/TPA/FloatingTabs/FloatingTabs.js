import React from 'react';
import {any, string} from 'prop-types';
import classNames from 'classnames';
import WixComponent from '../../BaseComponents/WixComponent';
import Button from '../Button/Button';
import tpaStyleInjector from '../TpaStyleInjector';

let styles = {locals: {}};
try {
  styles = require('!css-loader?modules&camelCase&localIdentName="[path][name]__[local]__[hash:base64:5]"!sass-loader!./FloatingTabs.scss');
} catch (e) {
}

class FloatingTabs extends WixComponent {
  static propTypes = {
    children: any,
    tabClassName: string,
    contentClassName: string,
    activeTabClassName: string
  };

  static defaultProps = {
    tabClassName: '',
    contentClassName: '',
    activeTabClassName: ''
  };

  constructor() {
    super();
    this.state = {
      selectedTabIndex: null
    };
  }

  getActiveId(activeId, items) {
    return activeId || items[0].props.id;
  }

  handleTabClick(id) {
    this.props.onChange(id);
  }

  renderButtons() {
    const {children, activeId, tabClassName, activeTabClassName} = this.props;
    const childrenArray = React.Children.toArray(children);
    const tabButtons = childrenArray.map(child => {
      const _activeId = this.getActiveId(activeId, children);
      const theme = (_activeId === child.props.id) ? 'fill' : 'outline';
      const isActiveClass = (_activeId === child.props.id) ? activeTabClassName : '';
      return (
        <Button
          key={child.props.id}
          onClick={() => this.handleTabClick(child.props.id)}
          className={classNames(styles.locals['wix-style-react-floating-tabs-button'], styles.locals['wix-style-react-floating-tabs-buttons-item'], isActiveClass, tabClassName)}
          dataHook={`floating-tab-item-button-${child.props.id}`}
          theme={theme}
          >
          {child.props.title}
        </Button>
      );
    });
    return (<div
      className={styles.locals['wix-style-react-floating-tabs-buttons']}
      data-hook="floating-tab-item-buttons"
      >
      {tabButtons}
    </div>);
  }

  renderContent() {
    const {children, activeId, contentClassName} = this.props;
    return React.Children.map(children, child => {
      const _activeId = this.getActiveId(activeId, children);
      const className = child.props.id === _activeId ? 'active' : '';
      return (<div
        className={classNames(className, styles.locals['wix-style-react-floating-tab-item'], contentClassName)}
        >{child}</div>);
    });
  }
  render() {
    return (
      <div className={styles.locals['wix-style-react-floating-tabs']}>
        {this.renderButtons()}
        {this.renderContent()}
      </div>
    );
  }
}

FloatingTabs.displayName = 'FloatingTabs';

export default tpaStyleInjector(FloatingTabs, styles);
