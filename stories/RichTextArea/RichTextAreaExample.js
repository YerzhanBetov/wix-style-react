import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Label from '../../src/Label';
import TextField from '../../src/TextField';
import TextArea from '../../src/TextArea';
import Input from '../../src/Input';
import InputArea from '../../src/InputArea';
import ToggleSwitch from '../../src/ToggleSwitch';
import RichTextAreaTemplate from './RichTextAreaTemplate';
import styles from './RichTextAreaExample.scss';

class RichTextAreaExample extends Component {
  state = {
    error: false,
    errorMessage: '',
    resizable: false,
    onImageRequest: callback => {
      const src = window.prompt('Enter the URL of the image:');
      if (!src) {
        return;
      }
      callback(src);
    },
    placeholder: 'Rich placeholder',
    value: '<p>$$$ Rich text area</p><strong>bold text here</strong><ul><li>The amazing fox lives in <a href="wix.com">Lithuania</a></li></ul>'
  };

  handleRichTextAreaChange = value => {
    this.setState({value});
  };

  render() {
    return (
      <div className={styles.form}>
        <div className={styles.input}>
          <div className={styles.option}>
            <Label for="placeholderInput">Placeholder</Label>
            <div className={styles.flex}>
              <Input
                id="placeholderInput"
                size="normal"
                theme="normal"
                value={this.state.placeholder}
                onChange={event => this.setState({placeholder: event.target.value})}
                />
            </div>
          </div>
          <div className={styles.option}>
            <Label>Error: </Label>
            <ToggleSwitch
              size="small"
              checked={this.state.error}
              onChange={() => this.setState({error: !this.state.error})}
              />
          </div>
          {this.renderErrorMessageInput()}
          <div className={styles.option}>
            <Label>Disabled: </Label>
            <ToggleSwitch
              size="small"
              checked={this.state.disabled}
              onChange={() => this.setState({disabled: !this.state.disabled})}
              />
          </div>
          <div className={styles.option}>
            <Label>Resizable: </Label>
            <ToggleSwitch
              size="small"
              checked={this.state.resizable}
              onChange={() => this.setState({resizable: !this.state.resizable})}
              />
          </div>
        </div>
        <div className={styles.output}>
          <RichTextAreaTemplate
            onTemplateChange={this.props.onChange}
            onChange={this.handleRichTextAreaChange}
            disabled={this.state.disabled}
            {...this.state}
            />
          <div className={styles.output}>
            <TextArea>
              <Label for="placeholderInput">Output value</Label>
              <InputArea
                id="placeholderInput"
                size="normal"
                theme="normal"
                value={this.state.value}
                resizable
                readOnly
                />
            </TextArea>
          </div>
        </div>
      </div>
    );
  }

  renderErrorMessageInput() {
    const {error, errorMessage} = this.state;

    if (!error) {
      return null;
    }

    return (
      <div className={styles.output}>
        <TextField>
          <Label for="errorMessageInput">Error message</Label>
          <Input
            id="errorMessageInput"
            size="normal"
            theme="normal"
            value={errorMessage}
            onChange={event => this.setState({errorMessage: event.target.value})}
            />
        </TextField>
      </div>
    );
  }
}

RichTextAreaExample.propTypes = {
  onChange: PropTypes.func
};

export default RichTextAreaExample;

