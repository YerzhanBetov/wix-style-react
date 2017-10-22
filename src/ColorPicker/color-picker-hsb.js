import React from 'react';
import {object, func} from 'prop-types';
import color from 'color';
import clamp from 'lodash/clamp';

import WixComponent from '../BaseComponents/WixComponent';
import {getBoundingRect} from './utils';

import css from './color-picker-hsb.scss';

export default class ColorPickerHsb extends WixComponent {

  static propTypes = {
    current: object.isRequired,
    onChange: func.isRequired
  }

  onMarkerDragStart = e => {
    e.preventDefault();
    window.addEventListener('mousemove', this.onMarkerDrag);
    window.addEventListener('mouseup', this.onMarkerDragEnd);
    this.gradientRect = getBoundingRect(this.gradient);
    this.setNewColorByMouseEvent(e);
  }

  onMarkerDrag = e => {
    this.setNewColorByMouseEvent(e);
  }

  onMarkerDragEnd = () => {
    window.removeEventListener('mousemove', this.onMarkerDrag);
    window.removeEventListener('mouseup', this.onMarkerDragEnd);
  }

  getSVByMouseEvent = e => {
    const x = e.clientX - this.gradientRect.left;
    const y = e.clientY - this.gradientRect.top;

    const s = clamp(100 * x / this.gradientRect.width, 0, 100);
    const v = clamp(100 - (100 * y / this.gradientRect.height), 0, 100);

    return {s, v};
  };

  setNewColorByMouseEvent = e => {
    const {onChange, current} = this.props;
    const {s, v} = this.getSVByMouseEvent(e);
    onChange(color({h: current.hue(), s, v}));
  }

  componentWillUnmount() {
    this.onMarkerDragEnd();
  }

  render() {
    const {current} = this.props;
    const hue = current.saturationv(100).lightness(50);
    const style = {
      left: `${current.saturationv()}%`,
      top: `${100 - current.value()}%`
    };
    return (
      <div className={css.root} ref={e => this.gradient = e} onMouseDown={this.onMarkerDragStart}>
        <div className={css.hue} style={{background: hue.hex()}}/>
        <div className={css.saturation}/>
        <div className={css.brightness}/>
        <div className={css.handle} style={style}/>
      </div>
    );
  }

}
