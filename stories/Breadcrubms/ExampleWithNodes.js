import React from 'react';
import styles from './ExampleBreadcrumbs.scss';

import Breadcrumbs from '../../src/Breadcrumbs/Breadcrumbs';

const itemsWithNode = [{id: '1', value: <span style={{color: 'red'}}>{'I\'m a span with styles'}</span>}, {
  id: '2',
  value: 'I\'m a regular string'
}, {id: '3', value: <a href="http://wix.com">{'I\'m a link'}</a>}];

export default () =>
  <div className={`${styles.onGrayBackground} ${styles.exampleWrapper}`}>
    <Breadcrumbs items={itemsWithNode}/>
  </div>;
