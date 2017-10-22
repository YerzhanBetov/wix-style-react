import React from 'react';
import Input from '../../../src/TPA/Input';
import styles from './styles.scss';

const InputExample = () => {
  return (
    <div style={{width: '300px'}}>
      <Input dataHook="story-input" placeholder="Default place holder" type="number"/>
    </div>
  );
};

export const InputValidationErrorExample = () => {
  return (
    <div style={{width: '300px'}}>
      <Input dataHook="story-input-error" error placeholder="Input in error state"/>
    </div>
  );
};

export const InputWithCustomStyleExample = () => {
  return (
    <div style={{width: '300px'}}>
      <Input dataHook="story-input-style" inputClassName={styles.customInput} placeholder="Input with custom style"/>
    </div>
  );
};

export const InputWithCustomErrorExample = () => {
  return (
    <div style={{width: '300px'}}>
      <Input dataHook="story-input-error-style" error errorClassName={styles.customError} placeholder="Input with custom error style"/>
    </div>
  );
};

export default InputExample;

