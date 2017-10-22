import React, {Component} from 'react';
import PropTypes from 'prop-types';

import RadioGroup from '../../../src/RadioGroup';
import Label from '../../../src/Label';
import PopoverMenuBuilder from './PopoverMenuBuilder';
import Input from '../../../src/Input';

import styles from './Example.scss';
import PopoverMenuTemplate from './PopoverMenuTemplate';

class ExamplePopoverMenu extends Component {

  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    size: 'normal',
    placement: 'top',
    menuItems: [
      {iconName: 'PenOutline', text: 'Edit'},
      {iconName: 'VisibilityHidden', text: 'Hide'},
      {iconName: 'Trash3', text: 'Delete'}
    ],
    buttonTheme: 'icon-greybackground',
    maxWidth: '378px'
  };

  addRow = () => {
    this.setState({menuItems: [...this.state.menuItems, {iconName: '', text: ''}]});
  };

  updateRowIcon = (iconName, i) => {
    this.setState({
      menuItems: [
        ...(this.state.menuItems.slice(0, i).map(obj => Object.assign({}, obj))),
        {iconName, text: this.state.menuItems[i].text},
        ...(this.state.menuItems.slice(i + 1).map(obj => Object.assign({}, obj)))
      ]
    });
  };

  updateRowText = (text, i) => {
    this.setState({
      menuItems: [
        ...(this.state.menuItems.slice(0, i).map(obj => Object.assign({}, obj))),
        {iconName: this.state.menuItems[i].iconName, text},
        ...(this.state.menuItems.slice(i + 1).map(obj => Object.assign({}, obj)))
      ]
    });
  };

  render() {
    return (
      <form className={styles.form}>
        <div className={styles.input}>

          <div className={styles.option}>
            <Label>Size</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.size}
                onChange={size => this.setState({size})}
                >
                <RadioGroup.Radio value="normal">Normal</RadioGroup.Radio>
                <RadioGroup.Radio value="large">Large</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>

          <div className={styles.option}>
            <Label>Direction</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.placement}
                onChange={placement => this.setState({placement})}
                >
                <RadioGroup.Radio value="top">Top</RadioGroup.Radio>
                <RadioGroup.Radio value="right">Right</RadioGroup.Radio>
                <RadioGroup.Radio value="bottom">Bottom</RadioGroup.Radio>
                <RadioGroup.Radio value="left">Left</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>

          <div className={styles.option}>
            <Label>Button Theme</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="vertical"
                value={this.state.buttonTheme}
                onChange={buttonTheme => this.setState({buttonTheme})}
                >
                <RadioGroup.Radio value="icon-greybackground">Icon Grey Background</RadioGroup.Radio>
                <RadioGroup.Radio value="icon-standard">Icon Blue</RadioGroup.Radio>
                <RadioGroup.Radio value="icon-standardsecondary">Icon Blue Secondary</RadioGroup.Radio>
                <RadioGroup.Radio value="icon-white">Icon White</RadioGroup.Radio>
                <RadioGroup.Radio value="icon-whitesecondary">Icon White Secondary</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>

          <div className={styles.option}>
            <Label>Max Width</Label>
            <div className={styles.flex}>
              <Input
                size="small"
                value={this.state.maxWidth}
                onChange={e => this.setState({maxWidth: e.target.value})}
                />
            </div>
          </div>

          <div className={styles.option}>
            <Label>Text</Label>
            <div className={styles.flex}>
              <PopoverMenuBuilder
                menuItems={this.state.menuItems}
                updateRowText={this.updateRowText}
                addRow={this.addRow}
                updateRowIcon={this.updateRowIcon}
                />
            </div>
          </div>

        </div>

        <div className={styles.output}>
          <div className={styles.exampleWrapper}>
            <PopoverMenuTemplate
              menuItems={this.state.menuItems}
              size={this.state.size}
              placement={this.state.placement}
              onChange={this.props.onChange}
              buttonTheme={this.state.buttonTheme}
              maxWidth={this.state.maxWidth}
              />
          </div>
        </div>
      </form>
    );
  }
}

export default ExamplePopoverMenu;
