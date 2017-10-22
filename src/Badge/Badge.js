import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';
import classnames from 'classnames';
import {node, oneOf, string} from 'prop-types';

import typography, {convertFromUxLangToCss} from '../Typography';
import badgeStyles from './Badge.scss';

/**
 * General purpose badge component to indicate important (or not so) things
 */
class Badge extends WixComponent {
  constructor(props) {
    super(props);
    this.setStyles(badgeStyles, typography);
  }

  render() {
    const {children, type, appearance, alignment, shape, dataHook} = this.props;
    const {styles, typography} = this;
    const className = classnames(
      styles.badge,
      styles[type],
      styles[alignment],
      styles[shape],
      typography[convertFromUxLangToCss(appearance)
        ]);

    return (
      <span className={className} data-hook={dataHook}>
        {children}
      </span>
    );
  }
}

Badge.propTypes = {
  /** node to render into badge */
  children: node.isRequired,

  /** define purpose of a badge, different color for each type */
  type: oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger', 'businessManagerCounter']),

  /** set `vertical-align` */
  alignment: oneOf(['top', 'bottom', 'middle']),

  /** choose appearance of typography. For Typography examples see storybook **Common** -> **Typography** */
  appearance: oneOf([
    'H0', 'H1', 'H2', 'H2.1', 'H3', 'H4',
    'T1', 'T1.1', 'T1.2', 'T1.3', 'T1.4',
    'T2', 'T2.1', 'T2.2', 'T2.3',
    'T3', 'T3.1', 'T3.2', 'T3.3', 'T3.4',
    'T4', 'T4.1', 'T4.2', 'T4.3',
    'T5', 'T5.1'
  ]),

  /** set the shape */
  shape: oneOf(['ellipse', 'rectangle']),

  /** set one to find component in testing environment */
  dataHook: string
};

Badge.defaultProps = {
  type: 'default',
  appearance: 'H4',
  alignment: 'middle',
  shape: 'ellipse'
};

Badge.displayName = 'Badge';

export default Badge;
