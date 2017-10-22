import React, {Component} from 'react';
import {Tooltip} from 'wix-style-react';
import {Button} from 'wix-style-react/Backoffice';
import styles from './Example.scss';

class ExampleBounce extends Component {

  state = {
    bounce: true
  };

  clearPendingTimeout() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
  }

  bounce() {
    this.clearPendingTimeout();
    if (this.state.bounce) {
      this.setState({bounce: false});
    } else {
      this.setState({bounce: true});
      this._timeoutId = setTimeout(() => {
        this._timeoutId = null;
        this.setState({bounce: false});
      }, 2000);
    }
  }

  render() {
    return (
      <div>
        <Tooltip active bounce={this.state.bounce} placement="right" alignment="center" content="Bounce" showTrigger="custom" hideTrigger="custom">
          <div className={styles.box}>Bounce</div>
        </Tooltip>
        <div style={{paddingTop: '20px'}}>
          <Button height="small" onClick={() => this.bounce()}>
            {this.state.bounce ? 'Stop' : 'Start'}
          </Button>
        </div>
      </div>
    );
  }
}

export default ExampleBounce;
