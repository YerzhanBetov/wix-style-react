import React from 'react';
import Badge from '../../../src/TPA/Badge';
import styles from './styles.scss';


const Example = () => {
  return (
    <div>
      <h2>TPA default styles</h2>
      <Badge type="primary">Primary</Badge>&nbsp;
      <Badge type="default">Default</Badge>&nbsp;
      <Badge type="success">Success</Badge>&nbsp;
      <Badge type="info">Info</Badge>&nbsp;
      <Badge type="warning">Warning</Badge>&nbsp;
      <Badge type="danger">Danger</Badge>
    </div>
  );
};

export const CustomExample = () => {
  return (
    <div>
      <h2>User defined custom styles/classes </h2>
      <Badge primaryClassName={styles.primary} type="primary">Primary</Badge>&nbsp;
      <Badge alignmentTopClassName={styles.mySuperTopClass} alignment="top" type="default">Default</Badge>&nbsp;
      <Badge alignment="top" type="success">Success</Badge>&nbsp;
      <Badge type="info">Info</Badge>&nbsp;
      <Badge type="warning">Warning</Badge>&nbsp;
      <Badge type="danger">Danger</Badge>
    </div>
  );
};

Example.displayName = 'Example';

export default Example;
