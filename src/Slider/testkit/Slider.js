import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import $ from 'jquery';
import Slider from '../Slider';

const sliderDriverFactory = component => {
  const $component = $(component);
  const $sliderHandles = $(component).find('.slider-handle');
  const $sliderDots = $(component).find('.rc-slider-dot');

  return {
    exists: () => !!component,
    isDotSelected: index => $sliderDots.filter(`:nth-child(${index})`).hasClass('rc-slider-dot-active'),
    numOfSliderDots: () => $sliderDots.length,
    numOfSLiderHandles: () => $sliderHandles.length,
    getToolTipValue: () => {
      const tooltip = $component.find('.slider-tooltip')[0];
      return tooltip && tooltip.innerHTML;
    },
    hoverHandle: ({handleIndex}) => {
      const handle = $sliderHandles[handleIndex];
      ReactTestUtils.Simulate.mouseEnter(handle);
    },
    unHoverHandle: ({handleIndex}) => {
      const handle = $sliderHandles[handleIndex];
      ReactTestUtils.Simulate.mouseLeave(handle);
    }
  };
};

const componentFactory = (props = {}) => {
  let component;
  const wrapper = document.createElement('div');
  ReactDOM.render(<div ref={r => component = r}><Slider onChange={() => {}} {...props}/></div>, wrapper);

  return component.childNodes[0];
};

const sliderTestkitFactory = ({component}) => {
  return sliderDriverFactory(component);
};


export {componentFactory, sliderDriverFactory, sliderTestkitFactory};
