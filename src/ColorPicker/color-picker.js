import React from 'react';
import color from 'color';
import {object, string, func, bool, oneOfType, node} from 'prop-types';

import WixComponent from '../BaseComponents/WixComponent';
import ColorPickerHsb from './color-picker-hsb';
import ColorPickerHue from './color-picker-hue';
import ColorPickerHistory from './color-picker-history';
import ColorPickerConverter from './color-picker-converter';
import ColorPickerActions from './color-picker-actions';

import css from './color-picker.scss';

const FALLBACK_COLOR = color('#86c6e5');

/**
 * Color Picker
 *
 * Under the hood uses color manipulation library [https://github.com/Qix-/color](https://github.com/Qix-/color).
 * Value for this component can be given in `string` or `object` format.
 * The callbacks always respond with color `object` format.
 */
export default class ColorPicker extends WixComponent {

  static displayName = 'ColorPicker';

  static propTypes = {
    /** Current color, can be given in `string` or `object` format [https://github.com/Qix-/color](https://github.com/Qix-/color) */
    value: oneOfType([string, object]).isRequired,

    /** Should current/previous color be displayed */
    showHistory: bool,

    /** Should `HEX`/`RGB`/`HSB` converter tabs be displayed */
    showConverter: bool,

    /** Should color input (in `HEX` mode) be displayed. This is relevant only if `showConverter` is `true` */
    showInput: bool,

    /** Handle color change event. */
    onChange: func.isRequired,

    /** Handle cancel button click */
    onCancel: func.isRequired,

    /** Handle confirm button click */
    onConfirm: func.isRequired,
    /** Children would be rendered above action buttons */
    children: node
  }

  static defaultProps = {
    showHistory: false,
    showConverter: true,
    showInput: true
  }

  constructor(props) {
    super(props);

    this.change = this.change.bind(this);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);

    const color = safeColor(props.value) || FALLBACK_COLOR;
    this.state = {current: color, previous: color};
  }

  render() {
    const {showHistory, showInput, showConverter, children} = this.props;
    const {current, previous} = this.state;
    return (
      <div className={css.root}>
        <ColorPickerHsb current={current} onChange={this.change}/>
        <ColorPickerHue current={current} onChange={this.change}/>
        <ColorPickerHistory show={showHistory} current={current} previous={previous}/>
        <ColorPickerConverter showConverter={showConverter} showInput={showInput} current={current} onChange={this.change}/>
        {children && (
          <div className={css.children}>{children}</div>
        )}
        <ColorPickerActions onConfirm={this.confirm} onCancel={this.cancel}/>
      </div>
    );
  }

  componentWillReceiveProps(props) {
    const color = safeColor(props.value);
    if (color && !equal(color, this.state.current)) {
      this.setState({current: color, previous: color});
    }
  }

  change(color) {
    this.setState({current: color}, () => {
      this.props.onChange(color);
    });
  }

  confirm() {
    this.props.onConfirm(this.state.current);
  }

  cancel() {
    this.props.onCancel(this.state.previous);
  }

}

function equal(color1, color2) {
  return color1.hex() === color2.hex();
}

function safeColor(input) {
  try {
    return color(input);
  } catch (error) {
    return null;
  }
}
