import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';
import RichTextArea from '../../src/RichTextArea';

class RichTextAreaTemplate extends Component {
  componentDidUpdate(props) {
    props.onTemplateChange(getExampleCode(this.getComponent()));
  }

  componentDidMount() {
    this.props.onTemplateChange(getExampleCode(this.getComponent()));
  }

  getComponent() {
    const props = {...this.props};
    delete props.onTemplateChange;

    return <RichTextArea {...props}/>;
  }

  render() {
    return this.getComponent();
  }
}

RichTextAreaTemplate.propTypes = {
  onTemplateChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

function getExampleCode(element) {
  return reactElementToJSXString(element, {
    filterProps: ['onChange'],
    showDefaultProps: false
  });
}

export default RichTextAreaTemplate;
