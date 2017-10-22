import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import classnames from 'classnames';
import styles from './Modal.scss';
import {colors, positions} from './ModalConstants';
import WixComponent from '../BaseComponents/WixComponent';

class Modal extends WixComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    contentLabel: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(Object.keys(colors)),
    children: PropTypes.any,
    zIndex: PropTypes.number,
    shouldCloseOnOverlayClick: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onAfterOpen: PropTypes.func,
    horizontalPosition: PropTypes.oneOf(Object.keys(positions)),
    verticalPosition: PropTypes.oneOf(Object.keys(positions)),
    closeTimeoutMS: PropTypes.number,
    scrollable: PropTypes.bool,
    scrollableContent: PropTypes.bool,
    maxHeight: PropTypes.string,
    height: PropTypes.string
  }

  static defaultProps = {
    onOk: () => { },
    borderRadius: 0,
    theme: colors.blue,
    shouldCloseOnOverlayClick: false,
    horizontalPosition: 'center',
    verticalPosition: 'center',
    closeTimeoutMS: 500,
    scrollable: true,
    scrollableContent: false,
    height: 'auto',
    maxHeight: 'auto'
  }

  render() {
    const {
      horizontalPosition,
      verticalPosition,
      height,
      maxHeight,
      scrollableContent,
      borderRadius,
      zIndex,
      scrollable,
      theme,
      isOpen,
      shouldCloseOnOverlayClick,
      onRequestClose,
      onAfterOpen,
      contentLabel,
      closeTimeoutMS,
      children
    } = this.props;

    const justifyContent = positions[horizontalPosition];
    const alignItems = positions[verticalPosition];
    const customMaxHeight = scrollableContent && maxHeight === 'auto' ? '100vh' : maxHeight;

    const modalStyles = {
      overlay: {
        // Overriding defaults
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 11 + (zIndex || 0),
        backgroundColor: null, // null disables the property, use css instead
        // Overriding defaults - END
        display: 'flex',
        justifyContent,
        alignItems,
        overflowY: scrollable ? 'auto' : 'hidden'
      },
      content: {
        // Overriding defaults
        border: 'none',
        overflowY: scrollableContent ? 'auto' : 'initial',
        overflowX: scrollableContent ? 'hidden' : 'initial',
        height,
        customMaxHeight,
        WebkitOverflowScrolling: 'touch',
        outline: 'none',
        borderRadius,
        padding: '0px',
        boxShadow: '0 0 14px 0 rgba(22, 45, 60, 0.3)',
        // Overriding defaults - END
        backgroundColor: 'transparent',
        marginBottom: '0px'
      }
    };

    const modalClasses = `${styles.modal} ${styles[theme]}`;
    const portalClassName = classnames(styles.portal, {
      [styles.portalNonScrollable]: !scrollable
    });

    return (
      <ReactModal
        portalClassName={portalClassName}
        isOpen={isOpen}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        onRequestClose={onRequestClose}
        onAfterOpen={onAfterOpen}
        style={modalStyles}
        className={modalClasses}
        contentLabel={contentLabel}
        closeTimeoutMS={closeTimeoutMS}
        >
        {children}
      </ReactModal>
    );
  }
}

export default Modal;
