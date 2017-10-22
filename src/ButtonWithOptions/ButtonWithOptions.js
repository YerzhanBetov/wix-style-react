import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import omit from 'lodash/omit';
import DropdownLayout from '../DropdownLayout/DropdownLayout';
import Button from '../Button';
import styles from './ButtonWithOptions.scss';

class ButtonWithOptions extends WixComponent {
  constructor(props) {
    super(props);
    this.state = {showOptions: false};

    this.onSelect = this.onSelect.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
    this.showOptions = this.showOptions.bind(this);

    if (props.children) {
      this.sortChildren(props);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.sortChildren(nextProps);
  }

  sortChildren(props) {
    [this.buttonElement, ...this.optionsElement] = React.Children.toArray(props.children);
  }

  renderButton() {
    return React.cloneElement(this.buttonElement, {
      onClick: this.showOptions
    });
  }

  renderDropdownLayout() {
    const dropdownProps = omit(this.props, ['dataHook', 'restrainDropdownSize']);

    const dropdownLayoutOptions = React.Children.map(this.optionsElement, option => {
      const {children: value, ...rest} = option.props;
      return {value, ...rest};
    });

    return (
      <DropdownLayout
        {...dropdownProps}
        dataHook="buttonWithOptions-dropdownLayout"
        options={dropdownLayoutOptions}
        theme={this.props.theme}
        visible={this.state.showOptions}
        onSelect={this.onSelect}
        onClickOutside={this.hideOptions}
        />
    );
  }

  render() {
    const {dropDirectionUp} = this.props;
    const sizeRestrictionStyles = this.props.restrainDropdownSize ? {display: 'inline-block'} : {};

    return (
      <div style={sizeRestrictionStyles}>
        {dropDirectionUp ? this.renderDropdownLayout() : null}
        {this.renderButton()}
        {!dropDirectionUp ? this.renderDropdownLayout() : null}
      </div>
    );
  }

  hideOptions() {
    this.setState({showOptions: false});
  }

  showOptions() {
    this.setState({showOptions: true});
  }

  onSelect(option, isSelectedOption) {
    this.hideOptions();

    if (!isSelectedOption) {
      this.props.onSelect(option);
    }
  }
}

ButtonWithOptions.defaultProps = {
  ...DropdownLayout.defaultProps,
  onSelect: () => {},
  restrainDropdownSize: true
};

ButtonWithOptions.propTypes = {
  ...DropdownLayout.propTypes,
  restrainDropdownSize: PropTypes.bool,
  children: PropTypes.arrayOf((propValue, key) => {
    if (key === 0 && propValue[key].type !== ButtonWithOptions.Button) {
      return new Error(`ButtonWithOptions: Invalid Prop children, first child must be ButtonWithOptions.Button`);
    }

    if (key !== 0) {
      React.Children.forEach(propValue[key], item => {
        if (item.type !== ButtonWithOptions.Option) {
          return new Error(`ButtonWithOptions: Invalid Prop children was given. Validation failed on child number ${key}`);
        }
      });
    }
  })
};

ButtonWithOptions.Option = () => null;
ButtonWithOptions.Option.displayName = 'ButtonWithOptions.Option';

ButtonWithOptions.Button = props => (
  <div className={styles.buttonWrapper} data-hook="buttonWithOptions-button-wrapper">
    <Button {...props}/>
  </div>
);

ButtonWithOptions.Button.displayName = 'ButtonWithOptions.Button';

export default ButtonWithOptions;

