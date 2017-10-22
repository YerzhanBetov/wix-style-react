import React, {Component} from 'react';
import PropTypes from 'prop-types';

import RangeExample from './RangeTemplate';
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
      children: 'Range Label'
    },
    firstInput: {
      disabled: false,
      placeholder: '0',
      resizable: false
    },
    lastInput: {
      disabled: false,
      placeholder: '0',
      resizable: false
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

  toggleInputState(propertyName) {
    this.setState({
      firstInput: {...this.state.firstInput, [propertyName]: !this.state.firstInput[propertyName]},
      lastInput: {...this.state.firstInput, [propertyName]: !this.state.lastInput[propertyName]}
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
            <Label>Placeholders</Label>
            <div className={styles.flex}>
              <div className={styles['left-label']}>
                <Label>Left</Label>
              </div>
              <div>
                <Input
                  size="small"
                  value={this.state.firstInput.placeholder}
                  onChange={e => this.setComponentState('firstInput', {placeholder: e.target.value})}
                  />
              </div>
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles['label-margin']}>
              <Label>Right</Label>
            </div>
            <Input
              size="small"
              value={this.state.lastInput.placeholder}
              onChange={e => this.setComponentState('lastInput', {placeholder: e.target.value})}
              />
          </div>
          <div className={styles.flex}>
            <div className={styles['label-margin']}>
              <Label>Disabled</Label>
            </div>
            <ToggleSwitch
              size="small"
              checked={this.state.firstInput.disabled}
              onChange={() => this.toggleInputState('disabled')}
              />
          </div>
          <div className={styles.flex}>
            <div className={styles['label-margin']}>
              <Label>Error</Label>
            </div>
            <ToggleSwitch
              size="small"
              checked={this.state.firstInput.error}
              onChange={() => this.toggleInputState('error')}
              />
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
        </div>
        <div className={styles.output}>
          <RangeExample {...this.state} onChange={this.props.onChange}/>
        </div>
      </from>
    );
  }
}

export default ExampleStandard;
