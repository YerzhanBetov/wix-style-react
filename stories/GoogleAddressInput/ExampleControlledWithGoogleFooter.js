import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GoogleAddressInput from 'wix-style-react/GoogleAddressInput';
import clients from 'wix-style-react/clients';

const style = {
  display: 'inline-block',
  padding: '0 5px 0',
  width: '400px',
  lineHeight: '22px',
  paddingBottom: '350px'
};

class ControlledGoogleAddressInput extends Component {
  static propTypes = {
    result: PropTypes.bool
  };

  constructor({value}) {
    super();
    this.state = {value};
  }

  render() {
    const onSet = event => event && this.setState({value: event.originValue});
    const onChange = event => event && this.setState({value: event.target.value});

    return (
      <GoogleAddressInput
        {...this.props}
        poweredByGoogle
        value={this.state.value}
        onSet={onSet}
        onChange={onChange}
        placeholder="Enter Address..."
        Client={clients.GoogleMapsClient}
        />
    );
  }
}

export default () =>
  <div>
    <div style={style} className="ltr">
      <ControlledGoogleAddressInput countryCode="US"/>
    </div>
  </div>;
