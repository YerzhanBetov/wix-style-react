import React from 'react';
import sinon from 'sinon';
import ReactTestUtils from 'react-dom/test-utils';
import editableSelectorDriverFactory from './EditableSelector.driver';
import {createDriverFactory} from '../test-common';
import {editableSelectorTestkitFactory} from '../../testkit';
import EditableSelector from './EditableSelector';
import {editableSelectorTestkitFactory as enzymeEditableSelectorTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('EditableSelector', () => {
  const createDriver = createDriverFactory(editableSelectorDriverFactory);
  let props;

  beforeEach(() => {
    props = {};
  });

  it('should have a list of selectors', () => {
    props.options = [{title: 'a'}, {title: 'b'}];
    const driver = createDriver(<EditableSelector {...props}/>);
    expect(driver.items().length).toEqual(props.options.length);
  });

  it('should have all selector data ', () => {
    props.options = [{isSelected: true, title: 'Shir', onToggle: () => {}}];
    const driver = createDriver(<EditableSelector {...props}/>);
    const selector = driver.items()[0];
    expect(selector.isChecked()).toEqual(props.options[0].isSelected);
    expect(selector.getTitle()).toEqual(props.options[0].title);
  });

  it('should render a title', () => {
    props.title = 'I\'m a Title';
    const driver = createDriver(<EditableSelector {...props}/>);
    expect(driver.title()).toEqual(props.title);
  });

  it('should render "add row" button', () => {
    props.newRowLabel = 'add new!';
    const driver = createDriver(<EditableSelector {...props}/>);
    expect(driver.newRowButton().text()).toEqual(props.newRowLabel);
  });

  it('should call onOptionAdded', () => {
    props.onOptionAdded = sinon.spy();
    const driver = createDriver(<EditableSelector {...props}/>);
    const newTitle = 'new option';
    driver.addNewRow(newTitle);
    driver.clickApprove();
    expect(props.onOptionAdded.calledWith({newTitle})).toEqual(true);
  });

  it('should exit editing mode after approve click', () => {
    const driver = createDriver(<EditableSelector {...props}/>);
    const label = 'new option';
    driver.addNewRow(label);
    driver.clickApprove();
    expect(driver.isEditing()).toEqual(false);
  });

  it('should exit editing mode after cancel click', () => {
    const driver = createDriver(<EditableSelector {...props}/>);
    const label = 'new option';
    driver.addNewRow(label);
    driver.clickCancel();
    expect(driver.isEditing()).toEqual(false);
  });

  it('should have edit and delete actions for each option', () => {
    props.options = [{isSelected: false, title: 'Shir'}];
    const driver = createDriver(<EditableSelector {...props}/>);
    expect(driver.deleteButtonAt(0).length).toEqual(1);
    expect(driver.editButtonAt(0).length).toEqual(1);
  });

  it('should get "edit" button text from props', () => {
    props.options = [{isSelected: false, title: 'Shir'}];
    props.editButtonText = 'Edit Label';
    const driver = createDriver(<EditableSelector {...props}/>);
    expect(driver.editButtonAt(0).text()).toEqual(props.editButtonText);
  });

  it('should call onOptionEdit', () => {
    props.options = [{isSelected: false, title: 'Shir', onToggle: () => {}}];
    props.onOptionEdit = sinon.spy();
    const driver = createDriver(<EditableSelector {...props}/>);
    const newTitle = 'yo';
    driver.editRow(0, newTitle);
    driver.clickApprove();
    expect(props.onOptionEdit.calledWith({newTitle, index: 0})).toEqual(true);
  });

  it('should call onOptionToggle', () => {
    props.options = [{isSelected: false, title: 'Shir'}];
    props.onOptionToggle = sinon.spy();
    const driver = createDriver(<EditableSelector {...props}/>);
    driver.toggleItem(0);
    expect(props.onOptionToggle.calledOnce).toEqual(true);
    expect(props.onOptionToggle.calledWith(0)).toBe(true);
  });

  it('should call onOptionDelete', () => {
    props.options = [{isSelected: false, title: 'Shir', onToggle: () => {}}];
    props.onOptionDelete = sinon.spy();
    const driver = createDriver(<EditableSelector {...props}/>);
    driver.deleteRow(0);
    expect(props.onOptionDelete.calledWith({index: 0})).toEqual(true);
  });

  it('should use checkbox toggles', () => {
    props.toggleType = 'checkbox';
    props.options = [{isSelected: false, title: 'Shir'}];
    const driver = createDriver(<EditableSelector {...props}/>);
    const selector = driver.items()[0];
    expect(selector.toggleType()).toEqual(props.toggleType);
  });

  it('should use radio toggles', () => {
    props.toggleType = 'radio';
    props.options = [{isSelected: false, title: 'Shir'}];
    const driver = createDriver(<EditableSelector {...props}/>);
    const selector = driver.items()[0];
    expect(selector.toggleType()).toEqual(props.toggleType);
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><EditableSelector {...props} dataHook={dataHook}/></div>));
      const editableSelectorTestkit = editableSelectorTestkitFactory({wrapper, dataHook});
      expect(editableSelectorTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<EditableSelector {...props} dataHook={dataHook}/>);
      const editableSelectorTestkit = enzymeEditableSelectorTestkitFactory({wrapper, dataHook});
      expect(editableSelectorTestkit.exists()).toBeTruthy();
    });
  });
});
