import React, {Component} from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'wix-style-react/Icons';
import Dropdown from '../../../src/Dropdown';

class IconChooser extends Component {
  render() {
    const options = Object.keys(Icons).map(name => {
      return {id: name, value: <div style={{paddingLeft: '10px'}}>{React.createElement(Icons[name])} - {name}</div>};
    });
    return (
      <Dropdown
        selectedId={this.props.selectedId}
        options={options}
        onSelect={this.props.onSelect}
        placeholder={'Choose an icon'}
        valueParser={value => value.id}
        />
    );
  }
}

IconChooser.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default IconChooser;
