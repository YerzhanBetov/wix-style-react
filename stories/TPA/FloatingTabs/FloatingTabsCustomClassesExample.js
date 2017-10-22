import React, {Component} from 'react';
import FloatingTabs from '../../../src/TPA/FloatingTabs';
import FloatingTabItem from '../../../src/TPA/FloatingTabItem';
import styles from './styles.scss';

const style = {
  padding: '0 5px'
};

class FloatingTabsCustomClassesExample extends Component {

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
            <FloatingTabs activeId={this.state.id} onChange={id => this.handleTabChange(id)} contentClassName={styles.contentStyle} tabClassName={styles.tabStyle} activeTabClassName={styles.activeTab}>
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

FloatingTabsCustomClassesExample.displayName = 'FloatingTabs with custom classes example';

export default FloatingTabsCustomClassesExample;
