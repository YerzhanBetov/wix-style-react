import React from 'react';
import styles from './ExampleBreadcrumbs.scss';
import Breadcrumbs, {breadcrumbsPathFactory} from '../../src/Breadcrumbs/Breadcrumbs';

const items = breadcrumbsPathFactory('aa/bb/cc/dd');
const itemsAbsolute = breadcrumbsPathFactory('domain/names', 'http://www.wix.com', 'wix');

export default () =>
  <div className={`${styles.onGrayBackground} ${styles.exampleWrapper}`}>
    <div>Relative url:<Breadcrumbs items={items} size={'medium'}/></div>
    <div>Absolute url:<Breadcrumbs items={itemsAbsolute} size={'medium'}/></div>
  </div>;


