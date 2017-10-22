import React from 'react';
import Label from '../../../src/TPA/Label';
import Input from '../../../src/TPA/Input';
import styles from './styles.scss';


const LabelExample = () => {
  return (
    <div style={{width: '200px'}}>
      <Label for="input-id">Label text</Label>
      <Input id="input-id"/>
    </div>
  );
};

export const CustomStyleLabelExample = () => {
  return (
    <div style={{width: '200px'}}>
      <Label labelClassName={styles.customLabelStyle} for="input-id">Label text</Label>
      <Input id="input-id"/>
    </div>
  );
};

export default LabelExample;
