import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Exclamation from './Exclamation';
import WixComponent from '../BaseComponents/WixComponent';

import styles from './InputArea.scss';

/**
  * General inputArea container
  */
class InputArea extends WixComponent {
  constructor(props) {
    super(props);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.select = this.select.bind(this);
  }

  state = {
    focus: false,
    counter: (this.props.value || this.props.defaultValue || '').length
  };

  componentDidMount() {
    super.componentDidMount();
    this.props.autoFocus && this._onFocus();
  }

  render() {
    const {
      autoFocus,
      defaultValue,
      error,
      forceFocus,
      forceHover,
      id,
      onKeyUp,
      placeholder,
      readOnly,
      tabIndex,
      rows,
      value,
      minHeight,
      maxHeight,
      maxLength,
      resizable,
      hasCounter,
      theme,
      errorMessage,
      tooltipPlacement,
      onTooltipShow
    } = this.props;

    const inlineStyle = {};

    if (minHeight) {
      inlineStyle.minHeight = minHeight;
    }

    if (maxHeight) {
      inlineStyle.maxHeight = maxHeight;
    }

    const classes = classNames({
      [styles.root]: true,
      [styles[`theme-${theme}`]]: true,
      [styles.hasError]: !!error,
      [styles.hasHover]: forceHover,
      [styles.hasFocus]: forceFocus || this.state.focus,
      [styles.resizable]: !!resizable,
      [styles.hasCounter]: !!hasCounter,
      [styles.nonResizable]: !resizable
    });

    const ariaAttribute = {};
    Object.keys(this.props).filter(key => key.startsWith('aria')).map(key => ariaAttribute['aria-' + key.substr(4).toLowerCase()] = this.props[key]);

    return (
      <div className={styles.wrapper}>
        <div className={classes}>
          <textarea
            rows={rows}
            maxLength={maxLength}
            ref={ref => this.textArea = ref}
            className={styles.inputArea}
            id={id}
            style={inlineStyle}
            defaultValue={defaultValue}
            value={value}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            onKeyDown={this._onKeyDown}
            onChange={this._onChange}
            onDoubleClick={this._onDoubleClick}
            placeholder={placeholder}
            tabIndex={tabIndex}
            autoFocus={autoFocus}
            onKeyUp={onKeyUp}
            {...ariaAttribute}
            readOnly={readOnly}
            />
          {theme === 'material' && <div className={styles.bar}/>}
          {hasCounter && maxLength && <span className={styles.counter}>{this.state.counter}/{maxLength}</span>}
        </div>
        <div className={styles.error}>
          {error && <Exclamation errorMessage={errorMessage} tooltipPlacement={tooltipPlacement} onTooltipShow={onTooltipShow}/>}
        </div>
      </div>
    );
  }

  focus() {
    this.textArea && this.textArea.focus();
  }

  blur() {
    this.textArea && this.textArea.blur();
  }

  select() {
    this.textArea && this.textArea.select();
  }

  _onFocus() {
    this.setState({focus: true});
    this.props.onFocus && this.props.onFocus();

    if (this.props.autoSelect) {
      // Set timeout is needed here since onFocus is called before react
      // gets the reference for the input (specifically when autoFocus
      // is on. So setTimeout ensures we have the ref.input needed in select)
      setTimeout(() => this.select(), 0);
    }
  }

  _onBlur(e) {
    this.setState({focus: false});
    this.props.onBlur && this.props.onBlur(e);
  }

  _onKeyDown(e) {
    this.props.onKeyDown && this.props.onKeyDown(e);

    if (e.key === 'Enter') {
      this.props.onEnterPressed && this.props.onEnterPressed();
    } else if (e.key === 'Escape') {
      this.props.onEscapePressed && this.props.onEscapePressed();
    }
  }

  _onChange(e) {
    this.props.hasCounter && this.setState({counter: e.target.value.length});
    this.props.onChange && this.props.onChange(e);
  }
}

InputArea.displayName = 'InputArea';

InputArea.defaultProps = {
  theme: 'normal'
};

InputArea.propTypes = {
  ariaControls: PropTypes.string,
  ariaDescribedby: PropTypes.string,
  ariaLabel: PropTypes.string,

  /** Standard React Input autoFocus (focus the element on mount) */
  autoFocus: PropTypes.bool,

  /** Standard React Input autoSelect (select the entire text of the element on focus) */
  autoSelect: PropTypes.bool,
  dataHook: PropTypes.string,

  /** Default value for those who wants to use this component un-controlled */
  defaultValue: PropTypes.string,

  /** Sets UI to erroneous */
  error: PropTypes.bool,

  /** The error message to display when hovering the error icon, if not given or empty there will be no tooltip */
  errorMessage: PropTypes.string,
  forceFocus: PropTypes.bool,
  forceHover: PropTypes.bool,

  /** When true a letters counter will appear */
  hasCounter: PropTypes.bool,
  iconLeft: PropTypes.object,
  id: PropTypes.string,

  /** i.e. '12px' */
  maxHeight: PropTypes.string,

  /** Define max length allowed in the inputArea */
  maxLength: PropTypes.number,
  menuArrow: PropTypes.bool,

  /** i.e. '12px' */
  minHeight: PropTypes.string,

  /** onBlur callback */
  onBlur: PropTypes.func,

  /** onChange callback */
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onEnterPressed: PropTypes.func,
  onEscapePressed: PropTypes.func,

  /** onFocus callback */
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,

  /** onShow prop for the error tooltip */
  onTooltipShow: PropTypes.func,

  /** Placeholder to display */
  placeholder: PropTypes.string,

  /** Sets the input to readOnly */
  readOnly: PropTypes.bool,
  resizable: PropTypes.bool,

  /** Sets initial height according to the number of rows (chrome uses the rows for minHeight as well) */
  rows: PropTypes.number,
  style: PropTypes.oneOf(['normal', 'paneltitle', 'material', 'amaterial']),
  tabIndex: PropTypes.number,

  /** The theme of the input, can be one of `normal`, `paneltitle` */
  theme: PropTypes.oneOf(['normal', 'paneltitle', 'material', 'amaterial']),

  /** Placement of the error tooltip */
  tooltipPlacement: PropTypes.string,

  /** Inputs value */
  value: PropTypes.string
};

export default InputArea;
