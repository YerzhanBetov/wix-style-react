import React from 'react';
import ButtonWithOptions from 'wix-style-react/ButtonWithOptions';
import {Close} from '../../src/Icons/dist/index';

const style = {
  display: 'inline-block',
  padding: '0 5px 0',
  width: '200px',
  lineHeight: '22px',
  marginBottom: '350px'
};

const options = [
  {id: '0', value: 'First option'},
  {id: '1', value: 'Second option'},
  {id: '2', value: 'Third option', disabled: true},
  {id: '3', value: 'Fourth option'},
  {id: '4', value: 'Fifth option'},
  {id: '5', value: 'Very long option text jldlkasj ldk jsalkdjsal kdjaklsjdlkasj dklasj'}
];

const createOptions = options => options.map(option => {
  const {value, ...props} = option;
  return <ButtonWithOptions.Option key={option.id} {...props}>{value}</ButtonWithOptions.Option>;
});

class ControlledInputWithOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      selectedId: -1
    };
  }

  render() {
    const onSelect = option => {
      const value = option.value;
      this.setState({
        value,
        selectedId: option.id
      });

      console.log(`Selected option id=${JSON.stringify(option)}, value=${value}`);
    };

    const predicate = element =>
      this.state.value ?
      element.value.toLowerCase().indexOf(this.state.value.toLowerCase()) !== -1 :
      true;

    return (
      <ButtonWithOptions
        selectedId={this.state.selectedId}
        value={this.state.value}
        onSelect={onSelect}
        >
        <ButtonWithOptions.Button
          height="medium"
          theme="icon-standard"
          >
          <Close size="12px"/>
        </ButtonWithOptions.Button>
        {createOptions(options.filter(predicate))}
      </ButtonWithOptions>
    );
  }
}

export default () =>
  <div className="ltr" style={style}>
    <ControlledInputWithOptions/>
  </div>;
