import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip';
import RichTextAreaLinkForm from './RichTextAreaLinkForm';
import RichTextAreaButton from './RichTextAreaButton';

class RichTextAreaLinkButton extends Component {
  state = {
    isFormVisible: false
  };

  toggleForm = () => {
    this.state.isFormVisible ?
      this.hideForm() :
      this.showForm();
  };

  showForm = () => {
    this.setState({isFormVisible: true});
  };

  hideForm = () => {
    this.setState({isFormVisible: false});
  };

  handleFormSubmit = linkData => {
    this.props.onClick(linkData);
    this.hideForm();
  };

  getTooltipContent = isSelectionExpanded => (
    <RichTextAreaLinkForm
      onSubmit={this.handleFormSubmit}
      onCancel={this.hideForm}
      isTextInputVisible={isSelectionExpanded}
      />
  );

  render() {
    const {isFormVisible} = this.state;
    const {isActive, onClick, isSelectionExpanded} = this.props;

    return (
      <Tooltip
        appendToParent
        content={this.getTooltipContent(isSelectionExpanded)}
        overlay=""
        alignment="center"
        placement="bottom"
        showTrigger="custom"
        hideTrigger="custom"
        hideDelay={0}
        moveBy={{x: 2, y: 0}}
        active={isFormVisible}
        onClickOutside={this.hideForm}
        >
        <RichTextAreaButton
          disabled={this.props.disabled}
          onClick={isActive ? onClick : this.toggleForm}
          type="link"
          isActive={isActive}
          isTooltipDisabled={isFormVisible}
          />
      </Tooltip>
    );
  }
}

RichTextAreaLinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  isSelectionExpanded: PropTypes.bool
};

export default RichTextAreaLinkButton;
