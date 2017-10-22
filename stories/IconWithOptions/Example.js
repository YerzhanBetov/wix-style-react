import React from 'react';
import IconWithOptions from 'wix-style-react/IconWithOptions';
import {Image} from 'wix-style-react/Icons';

const style = {
  display: 'inline-block',
  padding: '0 5px 0',
  width: '200px',
  lineHeight: '22px',
  marginBottom: '160px',
  marginLeft: '50px',
  marginTop: '20px'
};

const options = [
  {id: 1, value: 'Option 1'},
  {id: 2, value: 'Option 2'},
  {id: 3, value: 'Option 3'},
  {id: 4, value: 'Option 4', disabled: true},
  {id: 5, value: 'Option 5'}
];

const optionsToArray = options => options.map(option => {
  const {value, ...props} = option;
  return <IconWithOptions.Option key={option.id} {...props}>{value}</IconWithOptions.Option>;
});


class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedId: 1};
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(option) {
    this.setState({selectedId: option.id});
    console.log(`Option ${JSON.stringify(option)} selected`);
  }

  render() {
    return (
      <IconWithOptions dataHook="story-iconWithOptions" onSelect={this.onSelect} selectedId={this.state.selectedId}>
        <IconWithOptions.Icon><Image size="30"/></IconWithOptions.Icon>
        {optionsToArray(options)}
      </IconWithOptions>
    );
  }
}

export default () =>
  <div className="ltr" style={style}>
    <Example/>
  </div>;
