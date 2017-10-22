import React from 'react';

import {EditableSelector, Tooltip, Button} from 'wix-style-react';

class PopoverWithEditableSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      options: [
        {title: 'Marc Banks'},
        {title: 'Bernard Park'},
        {title: 'Carlos Dunn'},
        {title: 'Norman Reeves'},
        {title: 'Richard Medina'}
      ]
    };
  }

  onOptionAdded = ({newTitle}) => {
    this.setState({
      options: [...this.state.options, {title: newTitle, isSelected: true}]
    });
  };

  onOptionEdit = ({newTitle, index}) => {
    this.setState({
      options: this.state.options.map((option, i) => index === i ? {title: newTitle} : option)
    });
  };

  onOptionToggle = index => {
    this.setState({
      options: this.state.options.map((option, i) => {
        if (index === i) {
          option.isSelected = !option.isSelected;
          return option;
        } else {
          return option;
        }
      })
    });
  };

  onOptionDelete = ({index}) => {
    this.setState({
      options: this.state.options.filter((option, i) => index !== i)
    });
  };

  render() {
    const content = (
      <EditableSelector
        onOptionAdded={params => this.onOptionAdded(params)}
        onOptionEdit={params => this.onOptionEdit(params)}
        onOptionDelete={params => this.onOptionDelete(params)}
        onOptionToggle={params => this.onOptionToggle(params)}
        options={this.state.options}
        />
    );

    return (
      <div style={{backgroundColor: '#f0f4f7', minHeight: '300px', padding: '20px'}}>
        <Tooltip textAlign="start" placement="bottom" content={content} showTrigger="click" hideTrigger="click">
          <Button>click me</Button>
        </Tooltip>
      </div>
    );
  }
}

export default PopoverWithEditableSelector;
