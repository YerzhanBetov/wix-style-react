import React from 'react';
import {any, bool} from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import tpaStyleInjector from '../TpaStyleInjector';

let styles = {locals: {}};
try {
  styles = require('!css-loader?modules&camelCase&localIdentName="[path][name]__[local]__[hash:base64:5]"!sass-loader!./FloatingTabItem.scss');
} catch (e) { }

class FloatingTabItem extends WixComponent {
  static propTypes = {
    active: bool,
    children: any
  };

  static defaultProps = {
    //
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

FloatingTabItem.displayName = 'FloatingTabItem';

export default tpaStyleInjector(FloatingTabItem, styles);
