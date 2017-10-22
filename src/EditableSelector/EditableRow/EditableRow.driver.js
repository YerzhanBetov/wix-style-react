import React from 'react';
import ReactDOM from 'react-dom';
import inputDriverFactory from '../../Input/Input.driver';
import buttonDriverFactory from '../../Backoffice/Button/Button.driver';
import $ from 'jquery';

const editableRowDriverFactory = ({element, wrapper, component}) => {
  const el = $(element);
  const inputDriver = inputDriverFactory({element: el.find('[data-hook="edit-row-input"]')[0], wrapper: element});
  const approveBtnDriver = buttonDriverFactory({element: el.find('[data-hook="edit-row-approve-button"]')[0], wrapper: element});
  const cancelBtnDriver = buttonDriverFactory({element: el.find('[data-hook="edit-row-cancel-button"]')[0], wrapper: element});

  return {
    exists: () => !!element,
    isInputFocused: () => inputDriver.isFocus(),
    clickApprove: () => approveBtnDriver.click(),
    isApproveDisabled: () => approveBtnDriver.isButtonDisabled(),
    clickCancel: () => cancelBtnDriver.click(),
    getText: () => inputDriver.getValue(),
    setText: text => inputDriver.enterText(text),
    keyDown: keyCode => inputDriver.trigger('keyDown', {keyCode}),
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default editableRowDriverFactory;

