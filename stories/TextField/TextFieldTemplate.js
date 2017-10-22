import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';

import TextField from '../../src/TextField';
import Input from '../../src/Input';
import Label from '../../src/Label';

export default class Form extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    withLabel: PropTypes.bool,
    label: PropTypes.object,
    input: PropTypes.object,
    required: PropTypes.bool,
    info: PropTypes.string
  };

  state = {
    value: ''
  };

  componentDidUpdate(props) {
    props.onChange(reactElementToJSXString(this.getComponent()));
  }

  componentDidMount() {
    this.props.onChange(reactElementToJSXString(this.getComponent()));
  }

  getComponent() {
    return (
      <TextField required={this.props.required} info={this.props.info}>
        {this.props.withLabel ? <Label for="firstName" {...this.props.label}/> : null}
        <Input
          id="firstName"
          {...this.props.input}
          value={this.state.value}
          onChange={e => this.setState({value: e.target.value})}
          />
      </TextField>
    );
  }

  render() {
    return this.getComponent();
  }
}
