import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TextAreaExample from './TextAreaTemplate';
import Input from '../../src/Input';
import Label from '../../src/Label';
import ToggleSwitch from '../../src/ToggleSwitch';

import styles from './ExampleStandard.scss';

class ExampleStandard extends Component {

  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    withLabel: true,
    prefixSuffixValue: '',
    prefixUnit: '',
    prefixTicker: false,
    suffixUnit: '',
    suffixTicker: false,
    label: {
      appearance: 'T1.1',
      children: 'First name'
    },
    inputArea: {
      value: '',
      placeholder: 'Please type in your first name...',
      resizable: false,
      hasCounter: false
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
            <Label>Placeholder</Label>
            <div className={styles.flex}>
              <Input
                size="small"
                value={this.state.inputArea.placeholder}
                onChange={e => this.setComponentState('inputArea', {placeholder: e.target.value})}
                />
            </div>
          </div>

          <div className={styles.option}>
            <div className={styles.flex}>
              <div className={styles.paddRight}><Label>Required Field:</Label></div>
              <ToggleSwitch
                size="small"
                checked={this.state.required}
                onChange={() => this.setState({required: !this.state.required})}
                />
            </div>
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
            <Label>Input Area box size</Label>
            <div className={styles.column}>
              <Input
                size="small"
                type="number"
                placeholder="Set #rows"
                value={this.state.inputArea.rows}
                onChange={e => this.setComponentState('inputArea', {rows: e.target.value})}
                />
              <Input
                placeholder="Set min Height" size="small" type="number" unit="px"
                value={this.state.inputArea.minHeight}
                onChange={e => this.setComponentState('inputArea', {minHeight: e.target.value})}
                />
              <Input
                placeholder="Set max Height" size="small" type="number" unit="px"
                value={this.state.inputArea.maxHeight}
                onChange={e => this.setComponentState('inputArea', {maxHeight: e.target.value})}
                />

              <Input
                placeholder="Set max length" size="small" type="number"
                value={this.state.inputArea.maxLength}
                onChange={e => this.setComponentState('inputArea', {maxLength: e.target.value})}
                />
              <div className={styles.option}>
                <div className={styles.flex}>
                  <div className={styles.paddRight}><Label>Show Counter:</Label></div>
                  <ToggleSwitch
                    size="small"
                    checked={this.state.inputArea.hasCounter}
                    onChange={() => this.setComponentState('inputArea', {hasCounter: !this.state.inputArea.hasCounter})}
                    />
                </div>
              </div>

              <div className={styles.option}>
                <Label>Resizable: </Label>
                <ToggleSwitch
                  size="small"
                  checked={this.state.inputArea.resizable}
                  onChange={() => this.setComponentState('inputArea', {resizable: !this.state.inputArea.resizable})}
                  />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.output}>
          <TextAreaExample {...this.state} onChange={e => this._onChange(e)}/>
        </div>
      </from>
    );
  }

  _onChange(e) {
    // this.setComponentState('inputArea', {value: this.state.inputArea.value });
    this.props.onChange(e);
  }

}

export default ExampleStandard;
