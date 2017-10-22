import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import Modal from '../Modal/Modal';
import FooterStatus from './FooterStatus';
import Footer from './Footer';
import Header from './Header';
import MessageBoxFixedHeaderFooter from '../MessageBox/MessageBoxFixedHeaderFooter';
import InfiniteScroll from '../DataTable/InfiniteScroll';
import Search from './Search';

class ModalSelector extends WixComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    loadMore: PropTypes.func,
    hasMore: PropTypes.bool,
    initialLoad: PropTypes.bool,
    enableOk: PropTypes.bool,
    height: PropTypes.string,
    prefixContent: PropTypes.node,
    footerStatus: PropTypes.node,
    loader: PropTypes.node
  }

  static defaultProps = {
    loadMore: () => {},
    hasMore: false,
    initialLoad: false,
    height: '540px',
    loader: <div className="loader">Loading ...</div>,
    enableOk: false
  }

  render() {
    const {
      isOpen,
      height,
      onOk,
      onClose,
      onCancel,
      loadMore,
      hasMore,
      initialLoad,
      enableOk,
      footerStatus,
      prefixContent,
      loader,
      children
    } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Items Selection Modal"
        scrollableContent={false}
        scrollable={false}
        height={height}
        >
        <MessageBoxFixedHeaderFooter
          prefixContent={prefixContent}
          footer={<Footer onOk={onOk} onCancel={onCancel} enableOk={enableOk}>{footerStatus}</Footer>}
          header={<Header title="Choose Your Items" onCancel={onCancel} onClose={onClose}/>}
          >
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={hasMore}
            initialLoad={initialLoad}
            useWindow={false}
            loader={loader}
            >
            {children}
          </InfiniteScroll>
        </MessageBoxFixedHeaderFooter>
      </Modal>
    );
  }
}

ModalSelector.FooterStatus = FooterStatus;
ModalSelector.Search = Search;

export default ModalSelector;
