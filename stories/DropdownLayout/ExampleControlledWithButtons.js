import React, {Component} from 'react';
import DropdownLayout from 'wix-style-react/DropdownLayout';
import {ArrowDownThin} from 'wix-style-react/Icons';
import {Button} from 'wix-style-react/Backoffice';
import styles from './ExampleControlledWithButtons.scss';

const longOptions = [
  {id: 1, value: 'Option 1'},
  {id: 2, value: 'Option 2'},
  {id: 3, value: '-'},
  {id: 4, value: 'Option 3'},
  {id: 5, value: 'Disabled', disabled: true},
  {id: 6, value: 'Option 4'},
  {id: 7, value: 'Option 1'},
  {id: 8, value: 'Option 2'},
  {id: 9, value: '-'},
  {id: 10, value: 'Option 3'},
  {id: 11, value: 'Disabled', disabled: true},
  {id: 12, value: 'Option 4'},
  {id: 13, value: 'Option 1'},
  {id: 14, value: 'Option 2'},
  {id: 15, value: '-'},
  {id: 16, value: 'Option 3'},
  {id: 17, value: 'Disabled', disabled: true},
  {id: 18, value: 'Option 4'},
  {id: 19, value: 'Option 1'},
  {id: 20, value: 'Option 2'},
  {id: 21, value: '-'},
  {id: 22, value: 'Option 3'},
  {id: 23, value: 'Disabled', disabled: true},
  {id: 24, value: 'Option 4'}
];

const options = [
  {id: 1, value: 'Option 1'},
  {id: 2, value: 'Option 2'},
  {id: 0, value: '-'},
  {id: 3, value: 'Option 3'},
  {id: 'disabled', value: 'Disabled', disabled: true},
  {id: 4, value: 'Option 4'}
];

class ControlledExample extends Component {
  constructor() {
    super();
    this.state = {visible: -1};
  }

  render() {
    const onClose = () => this.setState({visible: -1});
    const onClick = button => () => this.setState({visible: button});

    return (
      <div>
        <div className={styles.buttons_holder}>
          <div className={styles.button}><Button height="medium" suffixIcon={<ArrowDownThin/>} onClick={onClick(1)} theme="fullblue">Click On Me</Button></div>
          <div className={styles.button}><Button height="medium" suffixIcon={<ArrowDownThin/>} onClick={onClick(2)} theme="fullblue">Click On Me Too</Button></div>
          <div className={styles.button}><Button height="medium" suffixIcon={<ArrowDownThin/>} onClick={onClick(3)} theme="fullblue">Click On Me Now</Button></div>
        </div>
        <div className={`ltr ${styles.dropdown_a}`}>
          <DropdownLayout visible={this.state.visible === 1} options={options} maxHeightPixels={100} onClose={onClose} onClickOutside={onClose}/>
        </div>
        <div className={`ltr ${styles.dropdown_b}`}>
          <DropdownLayout visible={this.state.visible === 2} options={longOptions} maxHeightPixels={1000} onClose={onClose} onClickOutside={onClose}/>
        </div>
        <div className={`ltr ${styles.dropdown_c}`}>
          <DropdownLayout visible={this.state.visible === 3} options={options} onClose={onClose} onClickOutside={onClose}/>
        </div>
      </div>
    );
  }
}

export default () =>
  <ControlledExample/>;
