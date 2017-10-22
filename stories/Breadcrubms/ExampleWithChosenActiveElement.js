import React from 'react';
import styles from './ExampleBreadcrumbs.scss';

import Breadcrumbs from '../../src/Breadcrumbs/Breadcrumbs';

const items = [{id: '1', value: 'first item'}, {id: '2', value: 'second item'}, {id: '3', value: 'third item'}];

class ControlledBreadcrumbs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeId: 3};
    this.onClick = this.onClick.bind(this);
  }

  onClick(item) {
    this.setState({activeId: item.id});
  }

  render() {
    return (
      <div className={`${styles.onGrayBackground} ${styles.exampleWrapper}`}>
        <Breadcrumbs
          dataHook={'story-breadcrumbs-active'}
          items={items}
          activeId={this.state.activeId}
          onClick={this.onClick}
          />
      </div>
    );
  }
}

export default () =>
  <div>
    <ControlledBreadcrumbs/>
  </div>;

