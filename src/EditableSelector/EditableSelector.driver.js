import React from 'react';
import ReactDOM from 'react-dom';
import selectorDriverFactory from '../Selector/Selector.driver';
import editableRowDriverFactory from './EditableRow/EditableRow.driver';
import ReactTestUtils from 'react-dom/test-utils';
import $ from 'jquery';

const editableSelectorDriverFactory = ({element, wrapper, component}) => {
  const el = $(element);
  const newRowButton = () => el.find('[data-hook="new-row-button-text"]');
  const selectorRowDriver = index => selectorDriverFactory({element: el.find('[data-hook="editable-selector-item"]').eq(index), wrapper: element});
  const editButtonAt = index => el.find('[data-hook="edit-item"]').eq(index);
  const deleteButtonAt = index => el.find('[data-hook="delete-item"]').eq(index);
  const editableRowDriver = () => editableRowDriverFactory({element: el.find('[data-hook="edit-row-wrapper"]')[0], wrapper: element});

  return {
    items: () => el.find('[data-hook="editable-selector-item"]').get().map(selector => selectorDriverFactory({element: selector})),
    exists: () => !!element,
    isEditing: () => !!el.find('[data-hook="edit-row-wrapper"]').length,
    newRowButton,
    deleteButtonAt,
    editButtonAt,
    addNewRow: label => {
      ReactTestUtils.Simulate.click(newRowButton()[0]);
      editableRowDriver().setText(label);
    },
    editRow: (index, label) => {
      ReactTestUtils.Simulate.click(editButtonAt(index)[0]);
      editableRowDriver().setText(label);
    },
    deleteRow: index => {
      ReactTestUtils.Simulate.click(deleteButtonAt(index)[0]);
    },
    clickApprove: () => editableRowDriver().clickApprove(),
    clickCancel: () => editableRowDriver().clickCancel(),
    title: () => el.find('[data-hook="editable-selector-title"] > span').text(),
    toggleItem: index => selectorRowDriver(index).toggle(),
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default editableSelectorDriverFactory;

