import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';
import Checkbox from '../../src/Checkbox';

export class Form extends Component {

  componentDidUpdate(props) {
    props.onChange(reactElementToJSXString(this.getComponent()));
  }

  componentDidMount() {
    this.props.onChange(reactElementToJSXString(this.getComponent()));
  }

  getComponent() {
    const maybeLabel = this.props.label && this.props.showLabel ? this.props.label : null;

    return (
      <Checkbox
        onChange={() => null}
        checked={this.props.checked}
        indeterminate={this.props.indeterminate}
        disabled={this.props.disabled}
        hasError={this.props.hasError}
        >
        {maybeLabel}
      </Checkbox>
    );
  }

  render() {
    return this.getComponent();
  }
}

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  hasError: PropTypes.bool
};

export default Form;

