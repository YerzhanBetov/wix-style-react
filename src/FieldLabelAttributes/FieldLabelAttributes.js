import React from 'react';
import {bool, node} from 'prop-types';
import styles from './FieldLabelAttributes.scss';
import WixComponent from '../BaseComponents/WixComponent';
import Tooltip from '../Tooltip';
import Info2 from '../Icons/dist/components/Info2';

class FieldLabelAttributes extends WixComponent {

  render() {
    const requiredAstrix = <span data-hook="required" className={styles.required}/>;
    const infoTooltip = (
      <Tooltip
        appendToParent={this.props.appendToParent}
        content={this.props.info}
        theme="light"
        alignment="center"
        moveBy={{x: 0, y: -1}}
        hideDelay={0}
        >
        <span data-hook="info" className={styles.icon}>
          <Info2 size="18px"/>
        </span>
      </Tooltip>
    );

    return (
      <div className={styles.root} data-hook="field-label-attributes">
        { this.props.required ? requiredAstrix : null }
        { this.props.info ? infoTooltip : null }
      </div>
    );
  }
}

FieldLabelAttributes.defaultProps = {
  required: false,
  info: '',
  appendToParent: true
};

FieldLabelAttributes.propTypes = {
  required: bool,
  info: node,
  appendToParent: bool
};

export default FieldLabelAttributes;
