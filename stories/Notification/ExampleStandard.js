import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './ExampleStandard.scss';
import Notification from './Notification';
import {LOCAL_NOTIFICATION, GLOBAL_NOTIFICATION, STICKY_NOTIFICATION, DEFAULT_TIMEOUT} from '../../src/Notification';
import Label from '../../src/Label';
import ToggleSwitch from '../../src/ToggleSwitch';
import RadioGroup from '../../src/RadioGroup';
import Input from '../../src/Input';

class ExampleStandard extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    theme: PropTypes.string
  };

  state = {
    notification: {
      show: true,
      type: GLOBAL_NOTIFICATION,
      size: 'big',
      timeout: DEFAULT_TIMEOUT,
      zIndex: 10000
    },
    actionButton: {
      type: 'button',
      text: 'Thanks',
      link: 'https://www.wix.com'
    }
  };

  setComponentState(componentName, obj) {
    this.setState(prevState => {
      prevState[componentName] = {...this.state[componentName], ...obj};
      Object.keys(prevState[componentName])
        .forEach(k => !prevState[componentName][k] && delete prevState[componentName][k]);
      return prevState;
    });
  }

  setNotificationSize(actionButtonType) {
    const actionButtonIsShown = actionButtonType !== 'none';
    const size = actionButtonIsShown && actionButtonType === 'button' ? 'big' : 'small';
    this.setComponentState('notification', {size});
  }

  render() {
    const params = {...this.state};
    params.notification.theme = this.props.theme;
    return (
      <form className={styles.form}>
        <div className={styles.output}>
          <Notification {...params} onChange={this.props.onChange}/>
        </div>
        <div className={styles.input}>
          <div className={styles.option}>
            <div className={styles.flex}>
              <Label>This text will be covered by a local notification</Label>
            </div>
            <hr/>
          </div>
          <div className={styles.option}>
            <Label>Show Notification</Label>
            <div className={styles.flex}>
              <ToggleSwitch
                size="small"
                checked={this.state.notification.show}
                onChange={() => this.setComponentState('notification', {show: !this.state.notification.show})}
                />
            </div>
          </div>
          <div className={styles.option}>
            <Label>Type</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.notification.type}
                onChange={type => this.setComponentState('notification', {type})}
                >
                <RadioGroup.Radio value={GLOBAL_NOTIFICATION}>Global (push the content)</RadioGroup.Radio>
                <RadioGroup.Radio value={LOCAL_NOTIFICATION}>Local (on top of the content)</RadioGroup.Radio>
                <RadioGroup.Radio value={STICKY_NOTIFICATION}>Sticky (at screen top)</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>
          {
            this.state.notification.type !== GLOBAL_NOTIFICATION ?
              <div className={styles.option}>
                <Label>Timeout in ms (for local notifications)</Label>
                <div className={styles.column}>
                  <Input
                    placeholder="Set the timeout" size="small" type="number"
                    value={this.state.notification.timeout}
                    onChange={e => this.setComponentState('notification', {timeout: Number(e.target.value)})}
                    />
                </div>
              </div> :
              null
          }
          <div className={styles.option}>
            <Label>Button Type</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.actionButton.type}
                onChange={type => {
                  this.setComponentState('actionButton', {type});
                  this.setNotificationSize(type);
                }}
                >
                <RadioGroup.Radio value="button">Button</RadioGroup.Radio>
                <RadioGroup.Radio value="textLink">TextLink</RadioGroup.Radio>
                <RadioGroup.Radio value="none">None</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>
          {
            (this.state.actionButton.type === 'none') ? null :
            <div>
              {
                this.state.actionButton.type !== 'textLink' ? null :
                <div className={styles.option}>
                  <Label>Link</Label>
                  <div className={styles.flex}>
                    <Input
                      value={this.state.actionButton.link} size="small"
                      onChange={event => this.setComponentState('actionButton', {link: event.target.value})}
                      />
                  </div>
                </div>
              }
              <div className={styles.option}>
                <Label>Text</Label>
                <div className={styles.flex}>
                  <Input
                    value={this.state.actionButton.text} size="small"
                    onChange={event => this.setComponentState('actionButton', {text: event.target.value})}
                    />
                </div>
              </div>
            </div>
          }

        </div>
        <div className={styles.option}>
          <Label>z-index (optional)</Label>
          <div className={styles.column}>
            <Input
              placeholder="optional z-index" size="small" type="number"
              value={this.state.notification.zIndex}
              onChange={e => this.setComponentState('notification', {zIndex: Number(e.target.value)})}
              />
          </div>
        </div>
      </form>
    );
  }
}

export default ExampleStandard;
