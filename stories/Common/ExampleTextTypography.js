import React from 'react';

import {Text} from 'wix-style-react';

export default () =>
  <div>
    <h3>Body</h3>
    <ul className="ltr style-list">
      <li><Text appearance="T1">T1 - Helvetica_45 / 16px / 24px</Text></li>
      <li><Text appearance="T1.1">T1.1 - Helvetica_45 / 16px / 24px</Text></li>
      <li className="inverted">
        <Text appearance="T1.2">T1.2 - Helvetica_45 / 16px / 24px</Text>
      </li>
      <li><Text appearance="T1.3">T1.3 - Helvetica_45 / 16px / 24px</Text></li>
      <li><Text appearance="T1.4">T1.4 - Helvetica_45 / 16px / 24px</Text></li>
    </ul>

    <h3>Body Bold</h3>
    <ul className="ltr style-list">
      <li><Text appearance="T2">T2 - Helvetica_55 / 16px / 24px</Text></li>
      <li><Text appearance="T2.1">T2.1 - Helvetica_55 / 16px / 24px</Text></li>
      <li className="inverted">
        <Text appearance="T2.2">T2.2 - Helvetica_55 / 16px / 24px</Text>
      </li>
      <li><Text appearance="T2.3">T2.3 - Helvetica_55 / 16px / 24px</Text></li>
    </ul>

    <h3>Body Small</h3>
    <ul className="ltr style-list">
      <li><Text appearance="T3">T3 - Helvetica_45 / 14px / 18px</Text></li>
      <li><Text appearance="T3.1">T3.1 - Helvetica_45 / 14px / 18px</Text></li>
      <li className="inverted">
        <Text appearance="T3.2">T3.2 - Helvetica_45 / 14px / 18px</Text>
      </li>
      <li><Text appearance="T3.3">T3.3 - Helvetica_45 / 14px / 18px</Text></li>
      <li><Text appearance="T3.4">T3.4 - Helvetica_45 / 14px / 18px</Text></li>
    </ul>

    <h3>Body Small Bold</h3>
    <ul className="ltr style-list">
      <li><Text appearance="T4">T4 - Helvetica_55 / 14px / 18px</Text></li>
      <li><Text appearance="T4.1">T4.1 - Helvetica_55 / 14px / 18px</Text></li>
      <li className="inverted">
        <Text appearance="T4.2">T4.2 - Helvetica_55 / 14px / 18px</Text>
      </li>
      <li><Text appearance="T4.3">T4.3 - Helvetica_55 / 14px / 18px</Text></li>
    </ul>

    <h3>Text on labels</h3>
    <ul className="ltr style-list">
      <li><Text appearance="T5">T5 - Helvetica_65 / 10px</Text></li>
      <li className="inverted">
        <Text appearance="T5.1">T5.1 - Helvetica_65 / 10px</Text>
      </li>
      <li><Text appearance="T6">T6 - Helvetica_75 / 10px</Text></li>
    </ul>
  </div>;
