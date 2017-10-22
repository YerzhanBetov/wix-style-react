import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AutoCompleteCompositeExample from './AutoCompleteCompositeTemplate';
import Input from '../../src/Input';
import Label from '../../src/Label';
import ToggleSwitch from '../../src/ToggleSwitch';
import RadioGroup from '../../src/RadioGroup';

import styles from './ExampleStandard.scss';

const options = [
  {id: 1, value: 'First Option'},
  {id: 2, value: 'Second Option'},
  {id: 3, value: 'Third Option'},
  {id: 4, value: 'Fourth Option'},
  {id: 4, value: 'Fifth Option'}
];

class ExampleStandard extends Component {

  static propTypes = {
    onChange: PropTypes.func
  }

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
    autoComplete: {
      size: 'normal',
      placeholder: 'Please start typing...',
      options
    }
  }

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
      <from className={styles.form}>
        <div className={styles.autoComplete}>
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
                value={this.state.autoComplete.placeholder}
                onChange={e => this.setComponentState('autoComplete', {placeholder: e.target.value})}
                />
            </div>
          </div>
          <div className={styles.option}>
            <Label>Size</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.autoComplete.size}
                onChange={size => this.setComponentState('autoComplete', {size})}
                >
                <RadioGroup.Radio value="small">Small</RadioGroup.Radio>
                <RadioGroup.Radio value="normal">Normal</RadioGroup.Radio>
                <RadioGroup.Radio value="large">Large</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className={styles.output}>
          <AutoCompleteCompositeExample {...this.state} onChange={this.props.onChange}/>
        </div>
      </from>
    );
  }
}

export default ExampleStandard;
