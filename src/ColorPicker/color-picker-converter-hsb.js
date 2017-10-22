import React from 'react';
import color from 'color';
import {object, func} from 'prop-types';

import WixComponent from '../BaseComponents/WixComponent';
import Input from '../Input';

import css from './color-picker-converter.scss';

export default class ColorPickerConverterHsb extends WixComponent {

  static propTypes = {
    current: object.isRequired,
    onChange: func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = this.props.current.hsl().round().object();
  }

  render() {
    return (
      <div className={css.root}>
        <div className={css.distribute}>
          <Input size="small" value={this.state.h} onChange={e => this.change('h', e)}/>
          <Input size="small" value={this.state.s} onChange={e => this.change('s', e)}/>
          <Input size="small" value={this.state.l} onChange={e => this.change('l', e)}/>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(props) {
    this.setState(props.current.hsl().round().object());
  }

  change(part, {target: {value}}) {
    this.setState({[part]: value}, () => {
      const color = safeColor(this.state);
      if (color) {
        this.props.onChange(color);
      }
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
