import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Ticker from './Ticker';
import Unit from './Unit';
import Group from './Group';
import InputSuffix, {getVisibleSuffixCount} from './InputSuffix';

import styles from './Input.scss';

/** General input container */
class Input extends Component {
  static Ticker = Ticker;
  static Unit = Unit;
  static Group = Group;

  state = {
    focus: false
  };

  componentDidMount() {
    this.props.autoFocus && this._onFocus();
  }

  onCompositionChange = isComposing => {
    if (this.props.onCompositionChange) {
      this.props.onCompositionChange(isComposing);
    }

    this.isComposing = isComposing;
  };

  render(props = {}) {
    const {
      id,
      name,
      value,
      placeholder,
      help,
      helpMessage,
      unit,
      magnifyingGlass,
      menuArrow,
      defaultValue,
      tabIndex,
      clearButton,
      onClear,
      autoFocus,
      onKeyUp,
      onPaste,
      readOnly,
      prefix,
      suffix,
      type,
      errorMessage,
      maxLength,
      textOverflow,
      theme,
      disabled,
      error,
      width,
      tooltipPlacement,
      onTooltipShow,
      autocomplete
    } = this.props;

    const onIconClicked = () => {
      if (!disabled) {
        this.input.focus();
        this._onFocus();
      }
    };

    const isClearButtonVisible = (!!clearButton || !!onClear) && !!value && !error && !disabled;

    const visibleSuffixCount = getVisibleSuffixCount({
      error, disabled, help, magnifyingGlass, isClearButtonVisible, menuArrow, unit, suffix
    });

    const inputClassNames = classNames(styles.input, {
      [styles.withPrefix]: !!prefix,
      [styles.withSuffix]: visibleSuffixCount,
      [styles.withSuffixes]: visibleSuffixCount > 1
    });

    const ariaAttribute = {};
    Object.keys(this.props).filter(key => key.startsWith('aria')).map(key => ariaAttribute['aria-' + key.substr(4).toLowerCase()] = this.props[key]);

    const inputElement = (
      <input
        style={{textOverflow, width}}
        ref={input => this.input = input}
        className={inputClassNames}
        id={id}
        name={name}
        disabled={disabled}
        defaultValue={defaultValue}
        value={value}
        onChange={this._onChange}
        maxLength={maxLength}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
        onKeyDown={this._onKeyDown}
        onDoubleClick={this._onDoubleClick}
        onPaste={onPaste}
        placeholder={placeholder}
        tabIndex={tabIndex}
        autoFocus={autoFocus}
        onClick={this._onClick}
        onKeyUp={onKeyUp}
        readOnly={readOnly}
        type={type}
        autoComplete={autocomplete}
        onCompositionStart={() => this.onCompositionChange(true)}
        onCompositionEnd={() => this.onCompositionChange(false)}
        {...ariaAttribute}
        {...props}
        />);

    return (<div className={styles.inputWrapper}>
      {prefix && <div className={styles.prefix}>{prefix}</div>}

      { inputElement }
      { visibleSuffixCount > 0 && <InputSuffix
        error={error}
        errorMessage={errorMessage}
        theme={theme}
        disabled={disabled}
        help={help}
        helpMessage={helpMessage}
        onIconClicked={onIconClicked}
        magnifyingGlass={magnifyingGlass}
        isClearButtonVisible={isClearButtonVisible}
        onClear={this._onClear}
        menuArrow={menuArrow}
        unit={unit}
        focused={this.state.focus}
        suffix={suffix}
        tooltipPlacement={tooltipPlacement}
        onTooltipShow={onTooltipShow}
        /> }
    </div>);
  }

  focus = () => {
    this._onFocus();
    this.input && this.input.focus();
  };

  blur = () => {
    this.input && this.input.blur();
  };

  select = () => {
    this.input && this.input.select();
  };

  _onFocus = () => {
    this.setState({focus: true});
    this.props.onFocus && this.props.onFocus();

    if (this.props.autoSelect) {
      // Set timeout is needed here since onFocus is called before react
      // gets the reference for the input (specifically when autoFocus
      // is on. So setTimeout ensures we have the ref.input needed in select)
      setTimeout(() => this.select(), 0);
    }
  };

  _onBlur = e => {
    this.setState({focus: false});
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  _onClick = e => {
    this.props.onInputClicked && this.props.onInputClicked(e);
  };

  _onKeyDown = e => {
    if (this.isComposing) {
      return;
    }

    this.props.onKeyDown && this.props.onKeyDown(e);

    if (e.keyCode === 13 /* enter */) {
      this.props.onEnterPressed && this.props.onEnterPressed(e);
    } else if (e.keyCode === 27 /* esc */) {
      this.props.onEscapePressed && this.props.onEscapePressed(e);
    }
  };

  _onChange = e => {
    if (this.props.type === 'number' && !(/^[\d.,\-+]*$/.test(e.target.value))) {
      return;
    }

    this.props.onChange && this.props.onChange(e);
  }

  _onClear = e => {
    const {
      onClear
    } = this.props;

    this.input.value = '';

    e.target = {
      ...e.target,
      value: ''
    };
    this._onChange(e);
    this.focus();

    onClear && onClear();
  }
}

Input.displayName = 'Input';

Input.defaultProps = {
  size: 'normal',
  theme: 'normal',
  errorMessage: '',
  helpMessage: '',
  roundInput: false,
  textOverflow: 'clip',
  maxLength: 524288,
  width: 'initial',
  withSelection: false,
  clearButton: false
};

Input.propTypes = {
  ariaControls: PropTypes.string,
  ariaDescribedby: PropTypes.string,
  ariaLabel: PropTypes.string,

  /** Standard React Input autoFocus (focus the element on mount) */
  autoFocus: PropTypes.bool,

  /** Standard React Input autoSelect (select the entire text of the element on focus) */
  autoSelect: PropTypes.bool,

  /** Turns on or off autocomplete property, which is responsible for default browser autocomplete suggestion */
  autocomplete: PropTypes.oneOf(['off', 'on']),

  /** Specifies a data-hook for tests */
  dataHook: PropTypes.string,

  /** Default value for those who wants to use this component un-controlled */
  defaultValue: PropTypes.string,

  /** when set to true this component is disabl */
  disabled: PropTypes.bool,

  /** Is input value erroneous */
  error: PropTypes.bool,

  /** The error message to display when hovering the error icon, if not given or empty there will be no tooltip */
  errorMessage: PropTypes.node,
  forceFocus: PropTypes.bool,
  forceHover: PropTypes.bool,

  /** Adding a suffix help icon */
  help: PropTypes.bool,

  /** The help message to display when hovering the help icon, if not given or empty there will be no tooltip */
  helpMessage: PropTypes.node,
  id: PropTypes.string,

  /** Should the component include a magnifyingGlass */
  magnifyingGlass: PropTypes.bool,

  /** Input max length */
  maxLength: PropTypes.number,

  /** Should the component include a menu arrow */
  menuArrow: PropTypes.bool,

  /** Displays clear button (X) on a non-empty input */
  clearButton: PropTypes.bool,

  name: PropTypes.string,

  /** When set to true, this input will have no rounded corners on its left */
  noLeftBorderRadius: PropTypes.string,

  /** When set to true, this input will have no rounded corners on its right */
  noRightBorderRadius: PropTypes.string,

  /** Standard input onBlur callback */
  onBlur: PropTypes.func,

  /** Standard input onChange callback */
  onChange: PropTypes.func,

  /** Displays clear button (X) on a non-empty input and calls callback with no arguments */
  onClear: PropTypes.func,
  onCompositionChange: PropTypes.func,

  /** Called when user presses -enter- */
  onEnterPressed: PropTypes.func,

  /** Called when user presses -escape- */
  onEscapePressed: PropTypes.func,

  /** Standard input onFocus callback */
  onFocus: PropTypes.func,

  /** Standard input onClick callback */
  onInputClicked: PropTypes.func,

  /** Standard input onKeyDown callback */
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,

  /** called when user pastes text from clipboard (using mouse or keyboard shortcut) */
  onPaste: PropTypes.func,

  /** onShow prop for the error and help tooltips (supported only for amaterial them for now */
  onTooltipShow: PropTypes.func,

  /** Placeholder to display */
  placeholder: PropTypes.string,

  /** Component you want to show as the prefix of the input */
  prefix: PropTypes.node,

  /** Sets the input to readOnly */
  readOnly: PropTypes.bool,

  /** When set to true, this input will be rounded */
  roundInput: PropTypes.bool,

  /** Flip the magnify glass image so it be more suitable to rtl */
  rtl: PropTypes.bool,

  /** Specifies the size of the input */
  size: PropTypes.oneOf(['small', 'normal', 'large']),

  /** Component you want to show as the suffix of the input */
  suffix: PropTypes.node,

  /** Standard component tabIndex */
  tabIndex: PropTypes.number,

  /** Text overflow behaviour */
  textOverflow: PropTypes.string,

  /** The theme of the input */
  theme: PropTypes.oneOf(['normal', 'paneltitle', 'material', 'amaterial', 'flat', 'flatdark']),
  title: PropTypes.string,

  /** Placement of the error and help tooltips (supported only for amaterial them for now) */
  tooltipPlacement: PropTypes.string,
  type: PropTypes.string,
  unit: PropTypes.string,

  /** Inputs value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.string,
  withSelection: PropTypes.bool
};

export default Input;
