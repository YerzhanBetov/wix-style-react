import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';

import TextArea from '../../src/TextArea';
import InputArea from '../../src/InputArea';
import Label from '../../src/Label';

export default class Form extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    withLabel: PropTypes.bool,
    label: PropTypes.object,
    inputArea: PropTypes.object,
    required: PropTypes.bool,
    info: PropTypes.string
  };

  componentDidUpdate(props) {
    props.onChange(reactElementToJSXString(this.getComponent()));
  }

  componentDidMount() {
    this.props.onChange(reactElementToJSXString(this.getComponent()));
  }

  getComponent() {
    return (
      <TextArea required={this.props.required} info={this.props.info}>
        {this.props.withLabel ? <Label for="firstName" {...this.props.label}/> : null}
        <InputArea id="firstName" {...this.props.inputArea}/>
      </TextArea>
    );
  }

  render() {
    return this.getComponent();
  }
}
