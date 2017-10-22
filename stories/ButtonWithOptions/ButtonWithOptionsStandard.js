import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Template from './Template';
import RadioGroup from '../../src/RadioGroup';
import Label from '../../src/Label';
import Input from '../../src/Input';
import ToggleSwitch from '../../src/ToggleSwitch';
import * as Icons from 'wix-style-react/Icons';
import IconChooser from '../Backoffice/Button/IconChooser';

import styles from './ExampleButton.scss';

const nodeStyle = {
  background: 'azure',
  paddingLeft: '25px'
};

class ButtonWithOptionsStandard extends Component {

  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    disabled: false,
    theme: 'fullblue',
    text: 'Click On Me',
    height: 'medium',
    withArrow: false,
    style: {padding: '0 5px'},
    re: true,
    hasFixedFooter: false
  };

  render() {
    return (
      <from className={styles.form}>
        <div className={styles.input}>
          <Label>Button</Label>
          <div className={styles.option}>
            <Label>Type</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.theme}
                onChange={theme => this.setState({theme, iconOnly: false, restrainDropdownSize: true})}
                >
                <RadioGroup.Radio value="fullblue">Primary</RadioGroup.Radio>
                <RadioGroup.Radio value="transparentblue">Secondary</RadioGroup.Radio>
                <RadioGroup.Radio value="whiteblue">Secondary on grey</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>

          <div className={styles.option}>
            <Label>Icon Only</Label>
            <div className={styles.flex}>
              <RadioGroup
                value={this.state.theme}
                onChange={theme => this.setState({theme, iconOnly: true, restrainDropdownSize: false})}
                >
                <RadioGroup.Radio value="icon-greybackground">Grey Background</RadioGroup.Radio>
                <RadioGroup.Radio value="icon-standard">Standard Primary</RadioGroup.Radio>
                <RadioGroup.Radio value="icon-standardsecondary">Standard Secondary</RadioGroup.Radio>
                <RadioGroup.Radio value="icon-white">White Primary</RadioGroup.Radio>
                <RadioGroup.Radio value="icon-whitesecondary">White Secondary</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>

          <div className={styles.option}>
            <Label>Disabled</Label>
            <div className={styles.flex}>
              <ToggleSwitch
                size="small"
                checked={this.state.disabled}
                onChange={() => this.setState({disabled: !this.state.disabled})}
                />
            </div>
          </div>

          <div className={styles.option}>
            <Label>Prefix Icon</Label>
            <div className={styles.flex}>
              <IconChooser
                onSelect={option => this.setState({prefixIcon: React.createElement(Icons[option.id])})}
                />
            </div>
          </div>

          <div className={styles.option}>
            <Label>Suffix Icon</Label>
            <div className={styles.flex}>
              <IconChooser
                onSelect={option => this.setState({suffixIcon: React.createElement(Icons[option.id])})}
                />
            </div>
          </div>

          <div className={styles.option}>
            <Label>Text</Label>
            <div className={styles.flex}>
              <Input
                size="small"
                value={this.state.text}
                onChange={e => this.setState({text: e.target.value})}
                />
            </div>
          </div>

          <div className={styles.option}>
            <Label>Size</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.height}
                onChange={height => this.setState({height})}
                >
                <RadioGroup.Radio value="small">Small</RadioGroup.Radio>
                <RadioGroup.Radio value="medium">Regular</RadioGroup.Radio>
                <RadioGroup.Radio value="large">Large</RadioGroup.Radio>
                <RadioGroup.Radio value="x-large">x-large</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className={styles.input}>
          <Label>Dropdown Layout</Label>
          <div className={styles.option}>
            <Label>Override Theme</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.dropdownTheme}
                onChange={dropdownTheme => this.setState({dropdownTheme})}
                >
                <RadioGroup.Radio value="none">No Theme</RadioGroup.Radio>
                <RadioGroup.Radio value="b2b">b2b</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>

          <div className={styles.option}>
            <Label>With Arrow</Label>
            <div className={styles.flex}>
              <ToggleSwitch
                size="small"
                checked={this.state.withArrow}
                onChange={() => this.setState({withArrow: !this.state.withArrow})}
                />
            </div>
          </div>

          <div className={styles.option}>
            <Label>With Fixed Footer</Label>
            <div className={styles.flex}>
              <ToggleSwitch
                size="small"
                checked={this.state.hasFixedFooter}
                onChange={() =>
                  this.setState({hasFixedFooter: !this.state.hasFixedFooter, fixedFooter: this.state.hasFixedFooter ? null : <div style={nodeStyle}>I am a footer</div>})}
                />
            </div>
          </div>

          <div className={styles.option}>
            <Label>Restrain dropdown size to button size</Label>
            <div className={styles.flex}>
              <ToggleSwitch
                size="small"
                checked={this.state.restrainDropdownSize}
                onChange={() => this.setState({restrainDropdownSize: !this.state.restrainDropdownSize})}
                />
            </div>
          </div>
        </div>

        <div className={styles[this.state.theme === 'whiteblue' ? 'output-lightblue' : 'output']}>
          <div className={`${styles[this.state.theme]} ${styles.exampleWrapper} ltr`}>
            <Template {...this.state} onChange={this.props.onChange}/>
          </div>
        </div>
      </from>
    );
  }
}

export default ButtonWithOptionsStandard;
