import React, {Component} from 'react';
import DropdownLayout from 'wix-style-react/DropdownLayout';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '160px',
  lineHeight: '22px'
};

const options = [
  {id: 'first title', value: 'title', title: true},
  {id: 1, value: 'Option 1'},
  {id: 'title', value: 'this is a title', title: true},
  {id: 2, value: 'Option 2'},
  {id: 0, value: '-'},
  {id: 'disabled', value: 'Disabled', disabled: true},
  {id: 4, value: 'Option 4'}
];

class ControlledExample extends Component {
  constructor() {
    super();
    this.state = {selectedId: 3, show: true};
  }

  render() {
    const onSelect = option => this.setState({selectedId: option.id});
    const onClose = () => this.setState({selectedId: -1});

    const selectedOption = options.find(item => item.id === this.state.selectedId);

    return (
      <div className="ltr" style={style}> Left to right
        <DropdownLayout visible options={options} onSelect={onSelect} selectedId={this.state.selectedId} onClose={onClose}/>
        <div style={{padding: '185px 0 16px'}}>{selectedOption ? selectedOption.value : 'Nothing'} is selected</div>
      </div>
    );
  }
}

export default () =>
  <ControlledExample/>;
