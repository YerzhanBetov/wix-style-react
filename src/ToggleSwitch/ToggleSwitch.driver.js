import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import $ from 'jquery';
import {isClassExists} from '../../test/utils';

const toggleSwitchDriverFactory = ({element, wrapper, component}) => {

  const toggleSwitch = $(element).find('input')[0];

  return {
    exists: () => !!element,
    click: () => ReactTestUtils.Simulate.change(toggleSwitch),
    isChecked: () => $(toggleSwitch).is(':checked'),
    isDisabled: () => isClassExists(element, 'disabled'),
    isXSmall: () => isClassExists(element, 'toggleSwitchXSmall'),
    isSmall: () => isClassExists(element, 'toggleSwitchSmall'),
    isLarge: () => !isClassExists(element, 'toggleSwitchXSmall') && !isClassExists(element, 'toggleSwitchSmall'),
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default toggleSwitchDriverFactory;
