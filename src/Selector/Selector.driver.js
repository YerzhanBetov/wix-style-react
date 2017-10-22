import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import $ from 'jquery';

const selectorDriverFactory = ({element, wrapper, component}) => {
  const el = $(element);
  const toggleInput = () => el.find('[data-hook="toggle"]').children('input').eq(0);

  return {
    exists: () => !!element,
    toggleType: () => toggleInput().prop('type'),
    isChecked: () => !!toggleInput().prop('checked'),
    getTitle: () => el.find('[data-hook="title"] > span').text(),
    getSubTitle: () => el.find('[data-hook="subtitle"] > span').text(),
    toggle: () => ReactTestUtils.Simulate.click(el[0]),
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default selectorDriverFactory;

