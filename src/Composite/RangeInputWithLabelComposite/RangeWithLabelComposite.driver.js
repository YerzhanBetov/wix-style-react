import React from 'react';
import RangeInputWithLabelComposite from './RangeInputWithLabelComposite';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const rangeInputWithLabelCompositeDriverFactory = ({element, wrapper}) => {
  const label = element.childNodes[0].childNodes[0];
  const hasLabel = label.tagName.toLowerCase() === 'label';
  const firstInput = hasLabel ? element.childNodes[1].childNodes[0] : element.childNodes[0].childNodes[0];
  const lastInput = hasLabel ? element.childNodes[1].childNodes[1] : element.childNodes[0].childNodes[1];
  return {
    exists: () => !!element,
    getLabel: () => label.textContent,
    hasLabel: () => label.tagName.toLowerCase() === 'label',
    hasInputs: () => !!firstInput && !!lastInput,
    getAttr: attrName => element.getAttribute(attrName),
    getNumberOfChildren: () => hasLabel ? element.childNodes[1].childElementCount : element.childNodes[0].childElementCount,
    hasFieldLabelAttributes: () => !!$(element).find('[data-hook="field-label-attributes"]').length,
    setProps: props => {
      ReactDOM.render(<div ref={r => element = r}><RangeInputWithLabelComposite {...props}/></div>, wrapper);
    }
  };
};

export default rangeInputWithLabelCompositeDriverFactory;
