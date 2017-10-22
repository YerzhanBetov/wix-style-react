import React from 'react';
import PropTypes from 'prop-types';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';
import WixComponent from '../BaseComponents/WixComponent';
import classNames from 'classnames';

import styles from './MessageBoxFunctionalLayout.scss';

class MessageBoxFunctionalLayout extends WixComponent {

  render() {
    const {
      title,
      onCancel,
      onOk,
      onClose,
      confirmText,
      cancelText,
      children,
      buttonsHeight,
      hideFooter,
      theme,
      closeButton,
      disableConfirmation,
      disableCancel,
      width,
      noBodyPadding
    } = this.props;

    return (
      <div className={styles.content} style={{width}}>
        <HeaderLayout title={title} onCancel={onClose ? onClose : onCancel} theme={theme} closeButton={closeButton}/>
        <div className={classNames(styles.body, noBodyPadding ? styles.noPadding : styles.withPadding)} data-hook="message-box-body">
          {children}
        </div>
        {
          !hideFooter ?
            <FooterLayout enableCancel={!disableCancel} enableOk={!disableConfirmation} buttonsHeight={buttonsHeight} confirmText={confirmText} cancelText={cancelText} onCancel={onCancel} onOk={onOk} theme={theme}/> : null
        }
      </div>
    );
  }
}

MessageBoxFunctionalLayout.propTypes = {
  hideFooter: PropTypes.bool,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  theme: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
  width: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.any,
  buttonsHeight: PropTypes.string,
  closeButton: PropTypes.bool,
  disableCancel: PropTypes.bool,
  disableConfirmation: PropTypes.bool,
  noBodyPadding: PropTypes.bool
};

MessageBoxFunctionalLayout.defaultProps = {
  buttonsHeight: 'small',
  disableCancel: false,
  disableConfirmation: false,
  width: '600px',
  noBodyPadding: false
};

export default MessageBoxFunctionalLayout;
