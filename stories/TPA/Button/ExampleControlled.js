import React, {Component} from 'react';
import Button from '../../../src/TPA/Button/Button';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '140px',
  lineHeight: '22px'
};

class ControlledExample extends Component {
  constructor() {
    super();
    this.state = {clicked: false, disabledClick: false};
  }

  render() {
    const onClick = () => this.setState({clicked: !this.state.clicked});

    return (
      <div>
        <div className="ltr" style={style}>
          Enabled<br/>
          <Button id="button" dataHook="story-button-enabled" onClick={onClick} >{this.state.clicked ? 'Clicked!' : 'Click Me!'}</Button>
        </div>
        <div className="ltr" style={style}>
          Disabled<br/>
          <Button id="button" dataHook="story-button-disabled" disabled onClick={onClick}>{this.state.disabledClick ? 'Clicked!' : 'Click Me!'}</Button>
        </div>
      </div>
    );
  }
}

export default () =>
  <ControlledExample/>;
