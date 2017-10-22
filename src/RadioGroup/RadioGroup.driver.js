import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import toArray from 'lodash/toArray';
import {isClassExists} from '../../test/utils';

const radioGroupDriverFactory = ({element, wrapper, component}) => {
  const radios = toArray(element.children) || [];
  const radioButtons = radios.map(radio => radio.childNodes[0]);
  const labels = radios.map(radio => radio.childNodes[1]);
  const selectedRadio = radios.find(radio => radio.childNodes[0].checked);
  const getRadioByValue = value => radioButtons.find(radioButton => radioButton.value === value.toString());

  return {
    exists: () => !!element,
    selectByValue: value => ReactTestUtils.Simulate.change(getRadioByValue(value)),
    selectByIndex: index => ReactTestUtils.Simulate.change(radioButtons[index]),
    getRadioValueAt: index => radioButtons[index].value,
    getSelectedValue: () => selectedRadio ? selectedRadio.childNodes[0].value : null,
    getClassOfLabelAt: index => labels[index].className,
    isVerticalDisplay: () => isClassExists(element, 'vertical'),
    isHorizontalDisplay: () => isClassExists(element, 'horizontal'),
    isButtonType: () => isClassExists(element, 'buttonType'),
    spacing: () => radios[0].style._values['margin-bottom'],
    lineHeight: () => radios[0].style._values['line-height'],
    getNumberOfRadios: () => radios.length,
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default radioGroupDriverFactory;
