import React, {Component} from 'react';
import PropTypes from 'prop-types';

import FieldWithSelectionTemplate from './FieldWithSelectionTemplate';
import Input from '../../src/Input';
import Label from '../../src/Label';
import RadioGroup from '../../src/RadioGroup';
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
    error: false,
    disabled: false,
    selectionInput: 'checkbox',
    label: {
      appearance: 'T1.1',
      children: 'Field With Selection Label'
    },
    firstInput: {
      placeholder: '0',
      resizable: false,
      borderRadius: 0
    },
    lastInput: {
      placeholder: '0',
      resizable: false
    },
    firstButtonLabel: 'Yes',
    secondButtonLabel: 'No',
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
    const maybeButtonLabelInputs = this.state.selectionInput !== 'buttons' ? null : (
      <div className={styles.controlGroup}>
        <div className={styles.option}>
          <Label>First Button</Label>
          <Input size="small" value={this.state.firstButtonLabel} onChange={e => this.setState({firstButtonLabel: e.target.value})}/>
        </div>
        <div className={styles.option}>
          <Label>Second Button</Label>
          <Input size="small" value={this.state.secondButtonLabel} onChange={e => this.setState({secondButtonLabel: e.target.value})}/>
        </div>
      </div>
    );

    return (
      <from className={styles.form}>
        <div>
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
          </div>
          <div className={styles.controlGroup}>
            <Label>Selection Input Type</Label>
            <div className={styles.radioGroup}>
              <RadioGroup
                display="horizontal"
                value={this.state.selectionInput}
                onChange={selectionInput => this.setState({selectionInput})}
                >
                <RadioGroup.Radio value={'checkbox'}>Checkbox</RadioGroup.Radio>
                <RadioGroup.Radio value={'dropdown'}>Dropdown</RadioGroup.Radio>
                <RadioGroup.Radio value={'buttons'}>Buttons</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>
          { maybeButtonLabelInputs }
          <div className={styles.controlGroup}>
            <Label>Error</Label>
            <div className={styles.radioGroup}>
              <RadioGroup
                display="horizontal"
                value={this.state.error}
                onChange={error => this.setState({error})}
                >
                <RadioGroup.Radio value={false}>False</RadioGroup.Radio>
                <RadioGroup.Radio value>True</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>
          <div className={styles.controlGroup}>
            <Label>Disabled</Label>
            <div className={styles.radioGroup}>
              <RadioGroup
                display="horizontal"
                value={this.state.disabled}
                onChange={disabled => this.setState({disabled})}
                >
                <RadioGroup.Radio value={false}>False</RadioGroup.Radio>
                <RadioGroup.Radio value>True</RadioGroup.Radio>
              </RadioGroup>
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
            <Label>Info</Label>
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
          <FieldWithSelectionTemplate {...this.state} onChange={this.props.onChange}/>
        </div>
      </from>
    );
  }
}

export default ExampleStandard;
