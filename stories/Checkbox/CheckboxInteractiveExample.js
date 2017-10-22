import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ToggleSwitch from './../../src/ToggleSwitch';
import Checkbox from './../../src/Checkbox';
import Label from './../../src/Label';
import Input from './../../src/Input';

import Template from './Template';

import styles from './CheckboxInteractiveExample.scss';

class CheckboxInteractiveExample extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    disabled: false,
    label: 'Check me out!',
    showLabel: true,
    checked: false,
    indeterminate: false,
    hasError: false
  }

  render() {
    return (
      <form className={styles.form}>
        <div className={styles.options}>
          <div className={styles.option}>
            <Label>Checkbox Label</Label>
            <div className={styles.flex}>
              <Input
                value={this.state.label}
                onChange={e => this.setState({label: e.target.value})}
                />&nbsp;
              <ToggleSwitch
                size="small"
                checked={this.state.showLabel}
                onChange={() => this.setState({showLabel: !this.state.showLabel})}
                />
            </div>
          </div>

          <div className={styles.option}>
            <Checkbox
              checked={this.state.indeterminate}
              onChange={() => this.setState({indeterminate: !this.state.indeterminate})}
              >
            Indeterminate
            </Checkbox>
          </div>

          <div className={styles.option}>
            <Checkbox
              checked={this.state.checked}
              onChange={() => this.setState({checked: !this.state.checked})}
              >
            Checked
            </Checkbox>
          </div>

          <div className={styles.option}>
            <Checkbox
              checked={this.state.hasError}
              onChange={() => this.setState({hasError: !this.state.hasError})}
              >
            Error
            </Checkbox>
          </div>
        </div>

        <div className={styles.preview}>
          <Template {...this.state} label={this.state.showLabel ? this.state.label : ''} onChange={this.props.onChange}/>
        </div>
      </form>
    );
  }
}

export default CheckboxInteractiveExample;
