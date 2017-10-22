import React from 'react';
import {bool, node, oneOf, func, string} from 'prop-types';
import classNames from 'classnames';
import styles from './CollapsedHeader.scss';
import Switch from '../../../src/ToggleSwitch';
import WixComponent from '../../../src/BaseComponents/WixComponent';
import Collapse from 'react-collapse';
import Button from '../../../src/Button';
import ArrowDownThin from '../../../src/Icons/dist/components/ArrowDownThin';
import ArrowUpThin from '../../../src/Icons/dist/components/ArrowUpThin';

class CollapsedHeader extends WixComponent {

  static propTypes = {
    title: node.isRequired,
    subtitle: node,
    withoutDivider: bool,
    children: node,
    toggleStyle: oneOf(['switch', 'button']),
    collapsed: bool,
    onCollapsedChange: func,
    buttonCollapseText: string,
    buttonExpandText: string
  };

  static defaultProps = {
    subtitle: null,
    collapsed: false,
    toggleStyle: 'switch',
    withoutDivider: false,
    buttonCollapseText: 'Less',
    buttonExpandText: 'More'
  };

  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: props.collapsed
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.collapsed !== nextProps.collapsed && nextProps.collapsed !== this.state.isCollapsed) {
      this.setState({isCollapsed: nextProps.collapsed});
    }
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  toggleCollapsed = () => {
    const {onCollapsedChange} = this.props;
    const isCollapsed = !this.state.isCollapsed;
    this.setState({isCollapsed});
    onCollapsedChange && onCollapsedChange(isCollapsed);
  };

  render() {
    const {title, subtitle, withoutDivider, buttonCollapseText, buttonExpandText} = this.props;

    const headerClasses = classNames({
      [styles.headerOnlyTitle]: !subtitle,
      [styles.headerTitleSubtitle]: subtitle,
      [styles.withDivider]: !withoutDivider
    });

    const switchElement = (
      <div className={styles.collapsedSwitch} onClick={this.stopPropagation}>
        <Switch dataHook="switch" onChange={this.toggleCollapsed} checked={!this.state.isCollapsed}/>
      </div>
    );

    const buttonElement = (
      <div className={styles.button} onClick={this.stopPropagation}>
        <Button
          dataHook="button"
          height="medium"
          prefixIcon={this.state.isCollapsed ? <ArrowDownThin/> : <ArrowUpThin/>}
          onClick={this.toggleCollapsed}
          theme="whiteblueprimary"
          type="button"
          >
          {this.state.isCollapsed ? buttonExpandText : buttonCollapseText}
        </Button>
      </div>
    );

    const titleElement = (
      <div data-hook="title" className={styles.title}>
        {title}
      </div>
    );

    const subtitleElement = subtitle ? (
      <div data-hook="subtitle" className={styles.subtitle}>
        {this.props.subtitle}
      </div>
    ) : null;

    const toggleElement = this.props.toggleStyle === 'switch' ? switchElement : buttonElement;

    return (
      <div>
        <div className={headerClasses} onClick={this.toggleCollapsed}>
          <div>
            {titleElement}
            {subtitleElement}
          </div>
          {toggleElement}
        </div>
        <Collapse isOpened={!this.state.isCollapsed}>
          {this.props.children}
        </Collapse>
      </div>
    );
  }
}

export default CollapsedHeader;
