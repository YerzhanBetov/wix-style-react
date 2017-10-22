import React from 'react';
import Dropdown from 'wix-style-react/Dropdown';
import Checkbox from 'wix-style-react/Checkbox';

const style = {
  display: 'inline-block',
  padding: '0 5px 0',
  width: '200px',
  lineHeight: '22px',
  marginBottom: '350px'
};

class CustomValuesInDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {checkboxChecked: false};
  }

  render() {
    const valueParser = option => (typeof option.value === 'string') ?
      option.value :
      option.value.props.children[0].props.children;

    const onSelect = option => console.log('Selected ', valueParser(option));

    const onChange = () => this.setState({checkboxChecked: !this.state.checkboxChecked});

    const customValue = (
      <div>
        <span>Custom Value</span>
        <span style={{marginLeft: '5px'}} onClick={e => e.stopPropagation()}>
          <Checkbox onChange={onChange} checked={this.state.checkboxChecked}/>
        </span>
      </div>
    );

    const options = [
      {id: 1, value: 'Option 1'},
      {id: 2, value: 'Option 2'},
      {id: 3, value: 'Option 3'},
      {id: 4, value: 'Option 4', disabled: true},
      {id: 5, value: 'Option 5'},
      {id: 6, value: customValue},
      {id: 7, value: customValue}
    ];

    return (
      <Dropdown
        options={options}
        selectedId={6}
        placeholder={'Choose an option'}
        valueParser={valueParser}
        onSelect={onSelect}
        />
    );
  }
}

export default () =>
  <div className="ltr" style={style}>
    <CustomValuesInDropdown/>
  </div>;
