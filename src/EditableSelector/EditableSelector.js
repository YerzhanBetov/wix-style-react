import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import Selector from '../Selector';
import Text from '../Text';
import ButtonWithOptions from '../ButtonWithOptions/ButtonWithOptions';
import EditableRow from './EditableRow/EditableRow';
import styles from './EditableSelector.scss';
import {Trash3, Plus2} from '../Icons';

class EditableSelector extends WixComponent {
  static propTypes = {
    title: PropTypes.string,
    toggleType: PropTypes.oneOf(['checkbox', 'radio']),
    newRowLabel: PropTypes.string,
    editButtonText: PropTypes.string,
    onOptionAdded: PropTypes.func,
    onOptionEdit: PropTypes.func,
    onOptionDelete: PropTypes.func,
    onOptionToggle: PropTypes.func,
    options: PropTypes.array
  };

  static defaultProps = {
    toggleType: 'checkbox',
    newRowLabel: 'New Row',
    editButtonText: 'Edit'
  };

  state = {
    addingNewRow: false,
    editingRow: null
  };

  addNewRow = () => {
    this.setState({addingNewRow: true});
  };

  editItem = index => {
    this.setState({editingRow: index});
  };

  deleteItem = index => {
    this.props.onOptionDelete && this.props.onOptionDelete({index});
  };

  onNewOptionApprove = ({newTitle, index}) => {
    if (this.state.addingNewRow) {
      this.props.onOptionAdded && this.props.onOptionAdded({newTitle});
    } else {
      this.props.onOptionEdit && this.props.onOptionEdit({newTitle, index});
    }
    this.setState({
      addingNewRow: false,
      editingRow: null
    });
  };

  onNewOptionCancel = () => {
    this.setState({
      addingNewRow: false,
      editingRow: null
    });
  };

  onOptionToggle = id => {
    this.props.onOptionToggle && this.props.onOptionToggle(id);
  };

  renderInput = (title, index) => {
    return (
      <EditableRow
        key={index}
        dataHook="edit-row-wrapper"
        onApprove={newTitle => this.onNewOptionApprove({newTitle, index})}
        onCancel={() => this.onNewOptionCancel()}
        newOption={title}
        />
    );
  };

  render() {
    const {
      title,
      newRowLabel,
      editButtonText,
      toggleType
    } = this.props;
    let {options} = this.props;
    options = options || [];
    return (
      <div>
        {title && <div className={styles.title} data-hook="editable-selector-title"><Text appearance="T2">{title}</Text></div>}
        <div>
          {options.map((option, index) =>
          this.state.editingRow === index ? this.renderInput(option.title, index) :
          <div data-hook="editable-selector-row" className={styles.row} key={index}>
            <Selector
              dataHook="editable-selector-item"
              id={index}
              title={option.title}
              isSelected={option.isSelected}
              toggleType={toggleType}
              onToggle={id => this.onOptionToggle(id)}
              />
            <div className={styles.optionMenu}>
              <ButtonWithOptions.Button onClick={() => this.deleteItem(index)} dataHook="delete-item" type="button" height="small" theme="icon-greybackground">
                <Trash3 size="15px"/>
              </ButtonWithOptions.Button>
              <ButtonWithOptions.Button onClick={() => this.editItem(index)} dataHook="edit-item" height="small" theme="fullblue">
                {editButtonText}
              </ButtonWithOptions.Button>
            </div>
          </div>
          )}
        </div>
        {this.state.addingNewRow && this.renderInput()}
        <div className={styles.newRowButton} onClick={() => this.addNewRow()} data-hook="new-row-button">
          <Text appearance="T1.3">
            <Plus2 size="13px"/>
            <span data-hook="new-row-button-text" className={styles.text}>{newRowLabel}</span>
          </Text>
        </div>
      </div>
    );
  }
}

EditableSelector.displayName = 'EditableSelector';

export default EditableSelector;
