import React, {Component} from 'react';
import tpaStyleInjector from '../TpaStyleInjector';
import {string, any} from 'prop-types';
import WixStyleBadge from '../../Badge';


let badgeStyles = {locals: {}};
try {
  badgeStyles = require(`!css-loader?modules&camelCase&localIdentName="[path][name]__[local]__[hash:base64:5]"!sass-loader!./Badge.scss`);
} catch (e) {
}

class Badge extends Component {
  static propTypes = {
    primaryClassName: string,
    warningClassName: string,
    defaultClassName: string,
    successClassName: string,
    dangerClassName: string,
    infoClassName: string,
    alignmentTopClassName: string,
    alignmentBottomClassName: string,
    alignmentMiddleClassName: string,
    children: any
  };

  extendStyles() {
    const {
      primaryClassName,
      warningClassName,
      defaultClassName,
      successClassName,
      dangerClassName,
      infoClassName,
      alignmentTopClassName,
      alignmentBottomClassName,
      alignmentMiddleClassName
    } = this.props;
    const _styles = Object.assign({}, badgeStyles.locals, {
      primary: primaryClassName || badgeStyles.locals.primary,
      warning: warningClassName || badgeStyles.locals.warning,
      default: defaultClassName || badgeStyles.locals.default,
      success: successClassName || badgeStyles.locals.success,
      info: infoClassName || badgeStyles.locals.info,
      danger: dangerClassName || badgeStyles.locals.danger,
      top: alignmentTopClassName || badgeStyles.locals.top,
      bottom: alignmentBottomClassName || badgeStyles.locals.bottom,
      middle: alignmentMiddleClassName || badgeStyles.locals.middle
    });

    return Object.keys(_styles).reduce((acc, next) => {
      acc[next] = _styles[next] || next;
      return acc;
    }, {});
  }

  render() {
    return (<WixStyleBadge {...this.props} styles={this.extendStyles()}>{this.props.children}</WixStyleBadge>);
  }
}

Badge.displayName = 'Badge';

export default tpaStyleInjector(Badge, badgeStyles);
