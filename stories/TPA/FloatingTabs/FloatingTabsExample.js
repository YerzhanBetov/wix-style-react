import React, {Component} from 'react';
import FloatingTabs from '../../../src/TPA/FloatingTabs';
import FloatingTabItem from '../../../src/TPA/FloatingTabItem';

const style = {
  padding: '0 5px'
};

class FloatingTabsExample extends Component {

  state = {id: 'first'}

  handleTabChange(id) {
    this.setState({id});
  }

  render() {
    return (
      <div>
        <div className="ltr" style={style}>
          Floating Tabs<br/>
          <div>
            <FloatingTabs activeId={this.state.id} onChange={id => this.handleTabChange(id)}>
              <FloatingTabItem id="first" title="Tab One">
                <h1>This is a first tab</h1>
                <p>Some text could go here...</p>
              </FloatingTabItem>
              <FloatingTabItem id="second" title="Tab Two">
                <h1>This is a <b>second</b> tab</h1>
                <p>Some text could go here...</p>
              </FloatingTabItem>
              <FloatingTabItem id="third" title="Tab Three">
                <h1>This is a third tab</h1>
                <p>Some text could go here...</p>
              </FloatingTabItem>
            </FloatingTabs>
          </div>
        </div>
      </div>
    );
  }
}

FloatingTabsExample.displayName = 'FloatingTabs Example';

export default FloatingTabsExample;
