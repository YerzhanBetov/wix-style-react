import React from 'react';
import Tag from 'wix-style-react/Tag';
import styles from './ExampleStandard.scss';

const ExampleStandard = () => (
  <div className={styles.main}>
    <div className={styles.row}>
      <Tag id="myId1" removable={false}>Small Tag</Tag>
      <Tag id="myId2">Small removable</Tag>
      <Tag id="myId3" thumb={<div className={styles.thumb}/>}>Small with Thumb</Tag>
    </div>
    <div className={styles.row}>
      <Tag id="myId4" size="large" removable={false}>Large Tag</Tag>
      <Tag id="myId5" size="large">Large removable</Tag>
      <Tag id="myId6" size="large" thumb={<div className={styles.thumb2}/>}>Large with Thumb</Tag>
    </div>
    <div className={styles.thinRow}>
      <Tag id="myId7" wrap>This is a very very very very very long tag that should wrap</Tag>
    </div>
    <div className={styles.row}>
      <Tag id="myId8" theme="warning">Warning theme</Tag>
      <Tag id="myId9" theme="error">Error theme</Tag>
    </div>
  </div>
);

export default ExampleStandard;
