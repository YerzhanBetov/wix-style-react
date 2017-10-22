import React from 'react';
import ToggleSwitch from 'wix-style-react/ToggleSwitch';

const styles = {
  header: {
    display: 'flex'
  },
  switch: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '40px'
  },
  text: {
    padding: '0 25px 0 5px'
  }
};

export default () =>
  <div style={styles.header}>
    <div style={styles.text}>X-Small
      <div style={styles.switch}>
        <ToggleSwitch size="x-small"/>
      </div>
    </div>

    <div style={styles.text}>Small
      <div style={styles.switch}>
        <ToggleSwitch size="small"/>
      </div>
    </div>

    <div style={styles.text}>Large
      <div style={styles.switch}>
        <ToggleSwitch checked size="large"/>
      </div>
    </div>
  </div>;
