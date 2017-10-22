import React from 'react';
import Button from '../../../src/TPA/Button';
import styles from './styles.scss';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '140px',
  lineHeight: '22px'
};

function Example() {
  return (
    <div>

      <div className="ltr" style={style}>
        Fill<br/>
        <Button theme="fill">Fill</Button>
      </div>

      <div className="ltr" style={style}>
        Outline<br/>
        <Button theme="outline">Outline</Button>
      </div>

      <div className="ltr" style={style}>
        Fill (Disabled)<br/>
        <Button theme="fill" disabled>Fill (Disabled)</Button>
      </div>

      <div className="ltr" style={style}>
        Custom<br/>
        <Button className={styles.customButton}>Custom</Button>
      </div>
    </div>
  );
}

Example.displayName = 'Example';

export default Example;
