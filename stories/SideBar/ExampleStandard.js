import React from 'react';
import SideBar from 'wix-style-react/SideBar';

const items = [
    {title: 'Home', id: '1'},
  {title: 'Submenu1', id: '2', children: [
        {title: 'Submenu1.1', id: '2.1'},
        {title: 'Submenu1.2', id: '2.2'},
        {title: 'Submenu1.3', id: '2.3'}
  ]},
  {title: 'Submenu2', id: '3', children: [
        {title: 'Submenu2.1', id: '3.1'},
        {title: 'Submenu2.2', id: '3.2'},
        {title: 'Submenu2.3', id: '3.3'}
  ]}
];

const commands = [
  {node: 'Preview', id: 'preview'},
  {node: 'H', id: 'h', tooltip: 'Help'},
  {node: 'V', id: 'v', tooltip: 'View'}
];

class ExampleStandard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedId: '2.2'};
    this.onSelect = this.onSelect.bind(this);
  }

  render() {
    return (
      <div>

        <h2>LTR</h2>

        <div className="ltr" style={{}}>
          <SideBar>

            <SideBar.Menu selectedId={this.state.selectedId} items={items} onSelect={this.onSelect}/>

            <div style={{height: '100px'}}/>

            <SideBar.BottomBar commands={commands} onClick={id => alert(`${id} clicked!`)}/>

          </SideBar>
        </div>

        <h2>RTL</h2>

        <div className="rtl" style={{direction: 'rtl'}}>
          <SideBar>

            <SideBar.Menu selectedId={this.state.selectedId} items={items} onSelect={this.onSelect}/>

            <div style={{height: '100px'}}/>

            <SideBar.BottomBar commands={commands} onClick={id => alert(`${id} clicked!`)}/>

          </SideBar>
        </div>
      </div>
    );
  }

  onSelect(selectedId) {
    if (selectedId === '2') {
      selectedId = '2.1';
    }
    if (selectedId === '3') {
      selectedId = '3.1';
    }
    this.setState({selectedId});
  }
}

export default ExampleStandard;
