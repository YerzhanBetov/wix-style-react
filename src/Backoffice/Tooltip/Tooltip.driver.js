import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import Tooltip from './Tooltip';
import $ from 'jquery';

const tooltipDriverFactory = ({element, wrapper}) => {
  const target = $(element).find('[data-hook=\'target\']').children(0)[0];
  const tooltipInner = $(element).find('[data-hook=\'tooltip-inner\']');
  const tooltipContent = tooltipInner.find('[data-hook=\'tooltip-content\']');

  return {
    isShown: () => tooltipInner.hasClass('active'),
    focus: () => ReactTestUtils.Simulate.focus(target),
    blur: () => ReactTestUtils.Simulate.blur(target),
    click: () => ReactTestUtils.Simulate.click(target),
    mouseEnter: () => ReactTestUtils.Simulate.mouseEnter(target),
    mouseLeave: () => ReactTestUtils.Simulate.mouseLeave(target),
    hasErrorTheme: () => !!wrapper.querySelector('.error'),
    hasDarkTheme: () => !!wrapper.querySelector('.dark'),
    hasLightTheme: () => !!wrapper.querySelector('.light'),
    getTooltipWrapper: () => wrapper.querySelector('[data-hook=\'tooltip\']'),
    getChildren: () => element.innerHTML,
    getPlacement: () => tooltipInner.attr('class').split(' ')[2],
    getContent: () => tooltipContent.html(),
    setProps: props => {
      ReactDOM.render(<div ref={r => element = r}><Tooltip {...props}><div/></Tooltip></div>, wrapper);
    },
    getWrapper: () => wrapper
  };
};

export default tooltipDriverFactory;
