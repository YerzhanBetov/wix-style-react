import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Template from './Template';
import RadioGroup from '../../../src/RadioGroup';
import Label from '../../../src/Label';
import Input from '../../../src/Input';

import styles from './Example.scss';

class ExampleTooltip extends Component {

  state = {
    type: 'default',
    text: 'Tooltip appears on hover',
    size: 'normal',
    maxWidth: '',
    onShow: () => console.log('onShow triggered'),
    onHide: () => console.log('onHide triggered'),
    onShowText: 'onShow triggered',
    onHideText: 'onHide triggered'
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
                <RadioGroup.Radio value="normal">Default</RadioGroup.Radio>
                <RadioGroup.Radio value="large">Bigger info tooltip</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>

          <div className={styles.option}>
            <Label>Theme</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.type}
                onChange={type => this.setState({type})}
                >
                <RadioGroup.Radio value="default">Dark</RadioGroup.Radio>
                <RadioGroup.Radio value="white">White</RadioGroup.Radio>
              </RadioGroup>
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
            <Label>onShow print to console</Label>
            <div className={styles.flex}>
              <Input
                size="small"
                value={this.state.onShowText}
                onChange={e => this.setState({onShowText: e.target.value})}
                />
            </div>
          </div>

          <div className={styles.option}>
            <Label>onHide print to console</Label>
            <div className={styles.flex}>
              <Input
                size="small"
                value={this.state.onHideText}
                onChange={e => this.setState({onHideText: e.target.value})}
                />
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
        </div>

        <div className={styles[this.state.theme === 'whiteblue' ? 'output-lightblue' : 'output']}>
          <div className={`${styles[this.state.theme]} ${styles.exampleWrapper}`}>
            <Template
              theme={this.state.type === 'default' ? 'dark' : 'light'}
              tooltipContent={this.state.text}
              type="tooltip"
              onChange={this.props.onChange}
              size={this.state.size}
              maxWidth={this.state.maxWidth}
              onShow={() => console.log(this.state.onShowText)}
              onHide={() => console.log(this.state.onHideText)}
              />
          </div>
        </div>
      </form>
    );
  }
}

export default ExampleTooltip;

ExampleTooltip.propTypes = {
  onChange: PropTypes.func.isRequired
};
