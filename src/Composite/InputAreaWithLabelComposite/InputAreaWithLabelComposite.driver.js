import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import fieldLabelAttributesDriverFactory from '../../FieldLabelAttributes/FieldLabelAttributes.driver';

const inputAreaWithLabelCompositeDriverFactory = ({element, wrapper, component}) => {
  const label = element.childNodes[0].childNodes[0];
  return {
    exists: () => !!element,
    getLabel: () => label.textContent,
    hasLabel: () => label.tagName.toLowerCase() === 'label',
    getAttr: attrName => element.getAttribute(attrName),
    getNumberOfChildren: () => element.childElementCount,
    getInfoTooltipTestKit: () => fieldLabelAttributesDriverFactory({wrapper, element: $(element).find('[data-hook="field-label-attributes"]')}).getTooltipTestKit(),
    hasFieldLabelAttributes: () => !!$(element).find('[data-hook="field-label-attributes"]').length,
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default inputAreaWithLabelCompositeDriverFactory;
