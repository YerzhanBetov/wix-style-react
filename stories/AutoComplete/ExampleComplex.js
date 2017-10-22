import React from 'react';
import AutoComplete from 'wix-style-react/AutoComplete';

const style = {
  display: 'inline-block',
  padding: '0 5px 0',
  width: '200px',
  lineHeight: '22px',
  marginBottom: '200px'
};

const options = [
  {id: 0, value: 'First option', v: 'F'},
  {id: 1, value: <div style={{color: 'red'}}>test</div>, v: 'S'},
  {id: 2, value: 'Third option', v: 'T', disabled: true},
  {id: 3, value: 'Fifth option', v: 'Fi'},
  {id: 4, value: 'Fourth option', v: 'Fo'}
];

// text -> value
// value -> ?

class ControlledAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', suggestions: options};
    this.onChange = this.onChange.bind(this);
    this.onSet = this.onSet.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onEscapePressed = this.onEscapePressed.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  render() {
    console.log('@@@@@@@@@@', this.state.suggestions);
    return (
      <AutoComplete
        ref="title"
        value={this.state.title}
        error
        placeholder={'Place holder'}
        autoSelect
        options={this.state.suggestions}
        onSelect={this.onSet}
        onManuallyInput={this.onManuallyInput}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onChange={this.onChange}
        onEscapePressed={this.onEscapePressed}
        onKeyDown={this.onKeyDown}
        />
    );
  }

  // suggestions -> options
  // onSet -> onSelect

  onChange(e) {
    console.log('>> Change!', e.target.value);
    const value = e.target.value;
    this.setState({
      suggestions: options.filter(o => o.value.toString().toLowerCase().indexOf(value.toLowerCase()) > -1)
    });
  }

  onSet(e) {
    console.log('>> Set!', e);
  }

  onBlur() {
    console.log('>> Blur!');
  }

  onFocus() {
    console.log('>> Focus!');
  }

  onEscapePressed() {
    console.log('>> Escape Pressed!');
  }

  onManuallyInput(e) {
    console.log('>> Manually input!', e);
  }

  onKeyDown(e) {
    console.log('>> Key down:', e, e.keyCode);
  }

}

export default () =>
  <div className="ltr" style={style}>
    <ControlledAutoComplete/>
  </div>;

