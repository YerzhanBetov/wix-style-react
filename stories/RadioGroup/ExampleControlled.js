import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RadioGroup from 'wix-style-react/RadioGroup';
import PenOutline from '../../src/Icons/dist/components/PenOutline';
import Redo from '../../src/Icons/dist/components/Redo';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '400px',
  lineHeight: '22px'
};

class ControlledRadioGroup extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.any
  };

  constructor({value}) {
    super();
    this.state = {value};
  }

  render() {
    const onChange = value => this.setState({value});

    return (
      <div className="ltr" style={style}>
        <RadioGroup {...this.props} value={this.state.value} onChange={onChange} dataHook="story-radio-group" disabledRadios={[4]}>
          <RadioGroup.Radio value={1}>Option 1</RadioGroup.Radio>
          <RadioGroup.Radio value={2}>Option 2</RadioGroup.Radio>
          <RadioGroup.Radio value={3}>Option 3</RadioGroup.Radio>
          <RadioGroup.Radio value={4}>Option 4</RadioGroup.Radio>
        </RadioGroup>
        <RadioGroup value={this.state.value} onChange={onChange} dataHook="story-radio-group" disabledRadios={[3]} display="horizontal" type="button">
          <RadioGroup.Radio value={1}>Option 1</RadioGroup.Radio>
          <RadioGroup.Radio value={2} icon={<PenOutline/>}> oprtion 2</RadioGroup.Radio>
          <RadioGroup.Radio value={3} icon={<Redo/>}/>
          <RadioGroup.Radio value={4} icon={<Redo/>}>only text</RadioGroup.Radio>
        </RadioGroup>
        <div className="rtl" style={{marginTop: '20px'}}>
          <RadioGroup value={this.state.value} onChange={onChange} dataHook="story-radio-group" disabledRadios={[3]} display="horizontal" type="button">
            <RadioGroup.Radio value={1}>אופציה 1</RadioGroup.Radio>
            <RadioGroup.Radio value={2} icon={<PenOutline/>}>אופציה 2</RadioGroup.Radio>
            <RadioGroup.Radio value={3} icon={<Redo/>}>אופציה 3</RadioGroup.Radio>
            <RadioGroup.Radio value={4} icon={<Redo/>}>אופציה 4</RadioGroup.Radio>
          </RadioGroup>
        </div>
      </div>
    );
  }
}

export default () =>
  <div>
    <div className="ltr" style={style}>
      <ControlledRadioGroup value={1}/>
    </div>
  </div>;
