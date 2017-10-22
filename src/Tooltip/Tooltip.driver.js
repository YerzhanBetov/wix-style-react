import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import Tooltip from './Tooltip';
import last from 'lodash/last';

const arrowDirectionToPlacement = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
};

const tooltipDriverFactory = ({element, wrapper}) => {
  return {
    isShown: () => !!document.body.querySelector('.tooltip'),
    focus: () => ReactTestUtils.Simulate.focus(element),
    blur: () => ReactTestUtils.Simulate.blur(element),
    click: () => ReactTestUtils.Simulate.click(element),
    mouseEnter: () => ReactTestUtils.Simulate.mouseEnter(element),
    mouseLeave: () => ReactTestUtils.Simulate.mouseLeave(element),
    hasErrorTheme: () => !!document.body.querySelector('.error'),
    hasDarkTheme: () => !!document.body.querySelector('.dark'),
    hasLightTheme: () => !!document.body.querySelector('.light'),
    getTooltipWrapper: () => document.body.querySelector('.tooltip'),
    getChildren: () => element.innerHTML,
    getPlacement: () => {
      const arrowDirection = last(document.querySelectorAll('.arrow')).className.split(' ')[1];
      return arrowDirectionToPlacement[arrowDirection];
    },
    getContent: () => {
      let content = document.body.querySelector('.tooltip');
      while (content.children.length > 0) {
        content = content.children[0];
      }
      return content.innerHTML;
    },
    getMaxWidth: () => {
      const content = document.body.querySelector('.tooltip');
      const values = content.style._values;
      return values['max-width'];
    },
    getPadding: () => {
      const content = document.body.querySelector('.tooltip');
      const values = content.style._values;
      return values.padding;
    },
    setProps: props => {
      ReactDOM.render(<div ref={r => element = r}><Tooltip {...props}/></div>, wrapper);
    }
  };
};

export default tooltipDriverFactory;
