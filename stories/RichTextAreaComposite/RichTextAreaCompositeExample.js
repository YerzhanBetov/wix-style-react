import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Label from '../../src/Label';
import TextField from '../../src/TextField';
import Input from '../../src/Input';
import styles from './RichTextAreaComposite.scss';
import ToggleSwitch from '../../src/ToggleSwitch';
import RichTextAreaCompositeTemplate from './RichTextAreaCompositeTemplate';

class RichTextAreaCompositeExample extends Component {

  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    withLabel: true,
    label: {
      appearance: 'T1.1',
      children: 'First name'
    },
    richTextArea: {
      placeholder: 'Please type your text here...',
      resizable: false,
      error: false,
      errorMessage: '',
      onImageRequest: callback => {
        const src = window.prompt('Enter the URL of the image:');
        if (!src) {
          return;
        }
        callback(src);
      },
      disabled: false
    },
    required: false,
    info: ''
  };

  setComponentState(componentName, obj) {
    this.setState(prevState => {
      prevState[componentName] = {...this.state[componentName], ...obj};
      Object.keys(prevState[componentName])
          .forEach(k => !prevState[componentName][k] && delete prevState[componentName][k]);
      return prevState;
    });
  }

  render() {
    return (
      <from className={styles.form}>
        <div className={styles.input}>
          <div className={styles.option}>
            <Label>Show label</Label>
            <div className={styles.flex}>
              <Input
                size="small"
                value={this.state.label.children}
                onChange={e => this.setComponentState('label', {children: e.target.value})}
                />&nbsp;
              <ToggleSwitch
                size="small"
                checked={this.state.withLabel}
                onChange={() => this.setState({withLabel: !this.state.withLabel})}
                />
            </div>
          </div>
          <div className={styles.option}>
            <Label for="placeholderInput">Placeholder</Label>
            <div className={styles.flex}>
              <Input
                id="placeholderInput"
                size="normal"
                theme="normal"
                value={this.state.richTextArea.placeholder}
                onChange={event => this.setComponentState('richTextArea', {placeholder: event.target.value})}
                />
            </div>
          </div>
          <div className={styles.option}>
            <Label for="maxHeightInput">Max height</Label>
            <div className={styles.flex}>
              <Input
                id="maxHeightInput"
                size="normal"
                theme="normal"
                value={this.state.richTextArea.maxHeight}
                onChange={event => this.setComponentState('richTextArea', {maxHeight: Number(event.target.value)})}
                />
            </div>
          </div>
          <div className={styles.option}>
            <Label>Required: </Label>
            <ToggleSwitch
              size="small"
              checked={this.state.required}
              onChange={() => this.setState({required: !this.state.required})}
              />
          </div>

          <div className={styles.option}>
            <Label>Info Tooltip</Label>
            <div className={styles.flex}>
              <Input
                size="small"
                value={this.state.info}
                onChange={e => this.setState({info: e.target.value})}
                />
            </div>
          </div>

          <div className={styles.option}>
            <Label>Error: </Label>
            <ToggleSwitch
              size="small"
              checked={this.state.richTextArea.error}
              onChange={() => this.setComponentState('richTextArea', {error: !this.state.richTextArea.error})}
              />
          </div>
          {this.renderErrorMessageInput()}
          <div className={styles.option}>
            <Label>Disabled: </Label>
            <ToggleSwitch
              size="small"
              checked={this.state.richTextArea.disabled}
              onChange={() => this.setComponentState('richTextArea', {disabled: !this.state.richTextArea.disabled})}
              />
          </div>
          <div className={styles.option}>
            <Label>Resizable: </Label>
            <ToggleSwitch
              size="small"
              checked={this.state.richTextArea.resizable}
              onChange={() => this.setComponentState('richTextArea', {resizable: !this.state.richTextArea.resizable})}
              />
          </div>
        </div>
        <div className={styles.output}>
          <RichTextAreaCompositeTemplate {...this.state} onChange={this.props.onChange}/>
        </div>
      </from>
    );
  }

  renderErrorMessageInput() {
    const {error, errorMessage} = this.state.richTextArea;

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
            onChange={event => this.setComponentState('richTextArea', {errorMessage: event.target.value})}
            />
        </TextField>
      </div>
    );
  }
}

export default RichTextAreaCompositeExample;
