import React from 'react';
import {func, object} from 'prop-types';
import color from 'color';
import clamp from 'lodash/clamp';

import WixComponent from '../BaseComponents/WixComponent';
import {getBoundingRect} from './utils';

import css from './color-picker-hue.scss';

export default class ColorPickerHue extends WixComponent {

  static propTypes = {
    current: object.isRequired,
    onChange: func.isRequired
  }

  onMarkerDragStart = e => {
    e.preventDefault();
    window.addEventListener('mousemove', this.onMarkerDrag);
    window.addEventListener('mouseup', this.onMarkerDragEnd);
    this.sliderRect = getBoundingRect(this.slider);
    this.setNewColorByMouseEvent(e);
  }

  onMarkerDrag = e => {
    this.setNewColorByMouseEvent(e);
  }

  onMarkerDragEnd = () => {
    window.removeEventListener('mousemove', this.onMarkerDrag);
    window.removeEventListener('mouseup', this.onMarkerDragEnd);
  }

  getHueByMouseEvent = e => {
    const x = e.clientX - this.sliderRect.left;
    return clamp(360 * x / this.sliderRect.width, 0, 359);
  }

  setNewColorByMouseEvent = e => {
    const {onChange, current} = this.props;
    const h = this.getHueByMouseEvent(e);
    onChange(color({h, s: current.saturationv(), v: current.value()}));
  }

  componentWillUnmount() {
    this.onMarkerDragEnd();
  }

  render() {
    // HUE is an intenger value from 0 to 360.
    const percentage = (this.props.current.hue() / 360) * 100;
    return (
      <div className={css.root} ref={e => this.slider = e} onMouseDown={this.onMarkerDragStart}>
        <div className={css.handle} style={{left: `${percentage}%`}}/>
      </div>
    );
  }

}
