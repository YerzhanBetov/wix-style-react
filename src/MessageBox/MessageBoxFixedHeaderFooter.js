import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './MessageBoxFixedHeaderFooter.scss';
import WixComponent from '../BaseComponents/WixComponent';

class MessageBoxFixedHeaderFooter extends WixComponent {

  render() {
    const {
      children,
      width,
      prefixContent,
      suffixContent,
      footer,
      header
    } = this.props;

    const customHeader = header && <div className={styles.header}>
      {header}
    </div>;
    const customPrefixContent = prefixContent && <div className={styles['prefix-content']}>
      {prefixContent}
    </div>;
    const customSuffixContent = suffixContent && <div className={styles['prefix-content']}>
      {suffixContent}
    </div>;
    const customFooter = footer && <div className={styles.footer}>
      {footer}
    </div>;

    return (
      <div className={styles.content} style={{width}}>
        {customHeader}
        {customPrefixContent}
        <div className={styles.body}>
          {children}
        </div>
        {customSuffixContent}
        {customFooter}
      </div>
    );
  }
}

MessageBoxFixedHeaderFooter.propTypes = {
  width: PropTypes.string,
  footer: PropTypes.node,
  header: PropTypes.node,
  children: PropTypes.any,
  prefixContent: PropTypes.node,
  sufixContent: PropTypes.node
};

MessageBoxFixedHeaderFooter.defaultProps = {
  width: '600px'
};

export default MessageBoxFixedHeaderFooter;
