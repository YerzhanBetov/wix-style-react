import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import * as Icons from '../../Icons';

class ExtraIcon extends WixComponent {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  render() {
    return (
      <div key={this.props.name}>
        <span>{React.createElement(Icons[this.props.name])}</span>
      </div>
    );
  }
}

export default ExtraIcon;
