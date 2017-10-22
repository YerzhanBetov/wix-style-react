import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TimeInput from 'wix-style-react/TimeInput';

export default class UncontrolledSlider extends Component {
  static propTypes = {
    startTime: PropTypes.object
  };

  render() {
    const onChange = value => this.setState({value});

    return (
      <div style={{display: 'flex', width: '250px', justifyContent: 'space-between'}}>
        <TimeInput {...this.props} startTime={this.props.startTime} onChange={onChange} disabled/>
        <TimeInput {...this.props} startTime={this.props.startTime} onChange={onChange} disabled dashesWhenDisabled/>
      </div>
    );
  }
}
