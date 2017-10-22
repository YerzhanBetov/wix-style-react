import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

const textLinkDriverFactory = ({element, wrapper, component}) => {

  const textLinkLayout = element ? element.children[0] : {};

  return {
    exists: () => !!element,
    click: () => ReactTestUtils.Simulate.click(element),
    getContent: () => textLinkLayout.textContent,
    doesComponentHasClass: className => textLinkLayout.className.indexOf(className) > 0,
    isDarkBackground: () => textLinkLayout.style._values.color === 'rgb(255, 255, 255)',
    hover: () => ReactTestUtils.Simulate.mouseEnter(textLinkLayout), //simulate hover on text link layout because events are not propagated
    getLink: () => element.href,
    getTarget: () => element.target,
    getRel: () => element.rel,
    isUnderline: () => textLinkLayout.style._values['text-decoration'] === 'underline',
    isLightBackground: () => textLinkLayout.style._values.color === 'rgb(56, 153, 236)',
    getSize: () => textLinkLayout.classList.contains('t1_3') ? 'medium' : textLinkLayout.classList.contains('t3_3') ? 'small' : 'unknown',
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default textLinkDriverFactory;
