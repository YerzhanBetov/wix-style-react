import React from 'react';
import {Tooltip} from 'wix-style-react';

import styles from './Example.scss';

export default () =>
  <Tooltip
    active
    placement="right"
    alignment="top"
    textAlign="left"
    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat eu sem rutrum tristique. Sed id odio non magna sodales egestas."
    showTrigger="custom"
    hideTrigger="custom"
    theme="dark"
    moveBy={{x: -40, y: 40}}
    maxWidth="400px"
    moveArrowTo={20}
    >
    <div className={styles.box}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        In vel erat eu sem rutrum tristique. Sed id odio non magna sodales egestas.
        Sed a magna elit. Suspendisse potenti.
        Quisque vehicula magna commodo eros sodales, eu volutpat tellus laoreet.
        Ut euismod elementum libero ac lobortis.
        Phasellus efficitur odio nec lorem sollicitudin, id maximus nunc porta.
        Integer ut felis eleifend, finibus neque eget, rutrum odio.
        Proin ultrices a quam in finibus. Cras sit amet rutrum velit.
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </p>
    </div>
  </Tooltip>;
