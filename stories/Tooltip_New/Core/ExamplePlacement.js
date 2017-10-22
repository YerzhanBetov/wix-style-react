import React from 'react';
import {Tooltip} from 'wix-style-react';

import styles from './Example.scss';

export default () =>
  <Tooltip active placement="right" alignment="center" content="Right Center" showTrigger="custom" hideTrigger="custom">
    <div className={styles.box}>Right Center</div>
  </Tooltip>;
