import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RichTextAreaComposite from '../../src/RichTextAreaComposite';
import RichTextArea from '../../src/RichTextArea';
import Label from '../../src/Label';
import reactElementToJSXString from 'react-element-to-jsx-string';

export default class Form extends Component {

  static propTypes = {
    withLabel: PropTypes.bool,
    label: PropTypes.object,
    richTextArea: PropTypes.object,
    onChange: PropTypes.func,
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
      <RichTextAreaComposite required={this.props.required} info={this.props.info}>
        {this.props.withLabel ? <Label {...this.props.label}/> : null}
        <RichTextArea {...this.props.richTextArea}/>
      </RichTextAreaComposite>
    );
  }

  render() {
    return this.getComponent();
  }
}
