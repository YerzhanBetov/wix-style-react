import React from 'react';
import PropTypes from 'prop-types';
import typography, {convertFromUxLangToCss} from '../Typography';
import WixComponent from '../BaseComponents/WixComponent';

/**
  * a regular html `<label>` element but in wix style
  */
class Label extends WixComponent {
  render() {
    const {appearance, id, children, for: forAttr} = this.props;
    const className = typography[convertFromUxLangToCss(appearance)];
    return (
      <label className={className} id={id} htmlFor={forAttr}>
        {children}
      </label>
    );
  }
}

Label.displayName = 'Label';

Label.propTypes = {
  /** id of element the label is for */
  for: PropTypes.string,

  /** one of available typography appearances */
  appearance: PropTypes.oneOf([
    'T1', 'T1.1', 'T1.2', 'T1.3', 'T1.4',
    'T2', 'T2.1', 'T2.2', 'T2.3',
    'T3', 'T3.1', 'T3.2', 'T3.3', 'T3.4',
    'T4', 'T4.1', 'T4.2', 'T4.3',
    'T5', 'T5.1']),

  children: PropTypes.any,
  id: PropTypes.string
};

Label.defaultProps = {
  appearance: 'T1.1'
};

export default Label;
