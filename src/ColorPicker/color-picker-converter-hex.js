import React from 'react';
import color from 'color';
import {object, func} from 'prop-types';

import WixComponent from '../BaseComponents/WixComponent';
import Input from '../Input';

import css from './color-picker-converter.scss';

export default class ColorPickerConverterHex extends WixComponent {

  static propTypes = {
    current: object.isRequired,
    onChange: func.isRequired
  }

  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
    this.state = {
      hex: props.current.hex(),
      inFocus: false
    };
  }

  render() {
    return (
      <div className={css.root}>
        <Input size="small" value={this.state.hex} onChange={this.change} onFocus={this.handleOnFocus} onBlur={this.handleOnBlur}/>
      </div>
    );
  }

  componentWillReceiveProps(props) {
    if (!this.state.inFocus && this.state.hex !== props.current.hex()) {
      this.setState({
        hex: props.current.hex()
      });
    }
  }

  change({target: {value}}) {
    this.setState({hex: value}, () => {
      const color = safeColor(value);
      if (color) {
        this.props.onChange(color);
      }
    });
  }

  handleOnFocus = () => {
    this.setState({
      inFocus: true
    });
  }

  handleOnBlur = () => {
    this.setState({
      inFocus: false,
      hex: this.props.current.hex()
    });
  }
}

function safeColor(input) {
  try {
    return color(input);
  } catch (error) {
    return null;
  }
}
