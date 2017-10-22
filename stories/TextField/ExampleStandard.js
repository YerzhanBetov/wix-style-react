import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TextFieldExample from './TextFieldTemplate';
import Input from '../../src/Input';
import Label from '../../src/Label';
import ToggleSwitch from '../../src/ToggleSwitch';
import RadioGroup from '../../src/RadioGroup';

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
    input: {
      size: 'normal',
      placeholder: 'Please type in your first name...',
      disabled: false,
      clearButton: false
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

  updateAddons(name, state) {
    this.setState(state, () => {
      const unit = this.state[`${name}Unit`];
      const ticker = this.state[`${name}Ticker`];
      if (unit && ticker) {
        this.setComponentState('input', {
          [name]: (
            <Input.Group>
              <Input.Unit value={unit}/>
              <Input.Ticker onUp={() => {}} onDown={() => {}}/>
            </Input.Group>
          )});
      } else if (unit) {
        this.setComponentState('input', {
          [name]: <Input.Unit value={unit}/>
        });
      } else if (ticker) {
        this.setComponentState('input', {
          [name]: <Input.Ticker onUp={() => {}} onDown={() => {}}/>
        });
      } else {
        this.setComponentState('input', {[name]: null});
      }
    });
  }

  render() {
    return (
      <form className={styles.form}>
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
                value={this.state.input.placeholder}
                onChange={e => this.setComponentState('input', {placeholder: e.target.value})}
                />
            </div>
          </div>

          <div className={styles.option}>
            <div className={styles.flex}>
              <div className={styles.paddRight}><Label>Required Field: </Label></div>
              <ToggleSwitch
                size="small"
                checked={this.state.required}
                onChange={() => this.setState({required: !this.state.required})}
                />
            </div>
          </div>

          <div className={styles.option}>
            <div className={styles.flex}>
              <div className={styles.paddRight}><Label>Clear Button: </Label></div>
              <ToggleSwitch
                size="small"
                checked={this.state.input.clearButton}
                onChange={() => this.setComponentState('input', {clearButton: !this.state.input.clearButton})}
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
            <Label>Size</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.input.size}
                onChange={size => this.setComponentState('input', {size})}
                >
                <RadioGroup.Radio value="small">Small</RadioGroup.Radio>
                <RadioGroup.Radio value="normal">Normal</RadioGroup.Radio>
                <RadioGroup.Radio value="large">Large</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>
          <div className={styles.option}>
            <Label>Type</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.input.type}
                onChange={type => this.setComponentState('input', {type})}
                >
                <RadioGroup.Radio value="">Text</RadioGroup.Radio>
                <RadioGroup.Radio value="number">Number</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>
          <div className={styles.option}>
            <Label>Prefix</Label>
            <div className={styles.flex}>
              <div className={styles.smallInput}>
                <Input
                  size="small"
                  value={this.state.prefixUnit}
                  onChange={e => this.updateAddons('prefix', {prefixUnit: e.target.value})}
                  />
              </div>
              &nbsp;Unit&nbsp;
              <ToggleSwitch
                size="small"
                checked={this.state.prefixTicker}
                onChange={() => this.updateAddons('prefix', {prefixTicker: !this.state.prefixTicker})}
                />&nbsp;with ticker
            </div>
          </div>
          <div className={styles.option}>
            <Label>Suffix</Label>
            <div className={styles.flex}>
              <div className={styles.smallInput}>
                <Input
                  size="small"
                  value={this.state.suffixUnit}
                  onChange={e => this.updateAddons('suffix', {suffixUnit: e.target.value})}
                  />
              </div>
              &nbsp;Unit&nbsp;
              <ToggleSwitch
                size="small"
                checked={this.state.suffixTicker}
                onChange={() => this.updateAddons('suffix', {suffixTicker: !this.state.suffixTicker})}
                />&nbsp;with ticker
            </div>
          </div>

          <div className={styles.option}>
            <div className={styles.flex}>
              <div className={styles.paddRight}><Label>Enabled state: </Label></div>
              <ToggleSwitch
                size="small"
                checked={!this.state.input.disabled}
                onChange={() => this.setComponentState('input', {disabled: !this.state.input.disabled})}
                />&nbsp;{this.state.input.disabled ? 'Disabled' : 'Enabled'}
            </div>
          </div>

        </div>
        <div className={styles.output}>
          <TextFieldExample {...this.state} onChange={this.props.onChange}/>
        </div>
      </form>
    );
  }
}

export default ExampleStandard;
