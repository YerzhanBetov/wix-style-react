import React from 'react';
import {string} from 'prop-types';
import classNames from 'classnames';
import WixComponent from '../../BaseComponents/WixComponent';
import tpaStyleInjector from '../TpaStyleInjector';

let styles = {locals: {}};
try {
  styles = require('!css-loader?modules&camelCase&localIdentName="[path][name]__[local]__[hash:base64:5]"!sass-loader!./Label.scss');
} catch (e) {
}

class Label extends WixComponent {
  static propTypes = {
    LabelClassName: string
  };

  static defaultProps = {
    LabelClassName: ''
  };

  constructor(props) {
    super(props);
    //Used for testing enviorment, to mock the styles
    //TODO: remove this line once css loader mock solution will be found
    styles = props.styles || styles;
  }

  render() {
    return <label className={classNames(styles.locals.label, this.props.labelClassName)} htmlFor={this.props.for}>{this.props.children}</label>;
  }
}

Label.displayName = 'Label';

export default tpaStyleInjector(Label, styles);
