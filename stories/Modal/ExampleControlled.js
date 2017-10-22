import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'wix-style-react/Modal';
import {Button} from 'wix-style-react/Backoffice';
import MessageBoxFunctionalLayout from 'wix-style-react/MessageBox/MessageBoxFunctionalLayout';

class ControlledModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool
  };

  constructor({isOpen = false}) {
    super();
    this.state = {isOpen};
  }

  render() {
    const setState = state => () => this.setState(state);

    const close = setState({isOpen: false});
    const open = setState({isOpen: true});

    return (
      <div>
        <Button onClick={open} >Open Blue Modal</Button>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={close}
          contentLabel="Modal Example"
          scrollableContent={false}
          >
          <MessageBoxFunctionalLayout
            theme="blue"
            title="title"
            confirmText="OK"
            cancelText="Cancel"
            onOk={close}
            onCancel={close}
            >
              Hello blue world!
          </MessageBoxFunctionalLayout>
        </Modal>
      </div>
    );
  }
}

export default () =>
  <div>
    <ControlledModal/>
  </div>;
