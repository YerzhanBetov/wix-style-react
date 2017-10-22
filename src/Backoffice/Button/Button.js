import React from 'react';
import {func, node, string} from 'prop-types';
import styles from './Button.scss';
import WixComponent from '../../BaseComponents/WixComponent';
import ButtonLayout from '../../ButtonLayout/ButtonLayout';
import omit from 'omit';

class Button extends WixComponent {
  static propTypes = {
    ...ButtonLayout.propTypes,
    children: node,
    id: string,
    prefixIcon: node,
    suffixIcon: node,
    type: string,
    onClick: func,
    onMouseEnter: func,
    onMouseLeave: func
  }

  static defaultProps = ButtonLayout.defaultProps;

  constructor(props) {
    super(props);
    this.addPrefix = this.addPrefix.bind(this);
    this.addSuffix = this.addSuffix.bind(this);
    this.addIcon = this.addIcon.bind(this);
  }

  addIcon(className, icon, height) {
    const iconSize = height === 'small' ? '8px' : height === 'medium' ? '12px' : '16px';
    const dataHook = className === styles.prefix ? 'btn-prefix' : 'btn-suffix';
    return (
      icon ?
        <div className={className} data-hook={dataHook}>
          {React.cloneElement(icon, {size: iconSize})}
        </div> :
        null
    );
  }

  addPrefix() {
    return this.addIcon(styles.prefix, this.props.prefixIcon, this.props.height);
  }

  addSuffix() {
    return this.addIcon(styles.suffix, this.props.suffixIcon, this.props.height);
  }

  render() {
    const {disabled, onClick, children, type, onMouseEnter, onMouseLeave} = this.props;
    const buttonLayoutProps = omit(['id', 'onClick', 'prefixIcon', 'suffixIcon', 'type'], this.props);
    return (
      <ButtonLayout {...buttonLayoutProps}>
        <button onClick={onClick} disabled={disabled} type={type} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          {this.addPrefix()}
          {children}
          {this.addSuffix()}
        </button>
      </ButtonLayout>
    );
  }
}

Button.displayName = 'Button';

export default Button;
