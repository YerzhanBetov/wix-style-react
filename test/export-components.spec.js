import fs from 'fs';
import path from 'path';

import * as exportedComponents from '../dist/src/index';

// TODO: only top level components should be exported
// the following are importable when using `import { Component } from 'wix-style-react';`
// but they are not, nor should be, when using `import Component from 'wix-style-react/Component';`
const componentsToSkip = [
  'MessageBoxMarketerialLayout',
  'MessageBoxFunctionalLayout',
  'MessageBoxLayout1',
  'MessageBoxLayout2',
  'HeaderLayout',
  'HeaderLayout1',
  'HeaderLayout2',
  'FooterLayout',
  'FooterLayout1',
  'SideMenuDrill',
  'Autocomplete' // special case, a typo in component name, should be AutoComplete
];

xdescribe('export components', () => {
  it('should contain all components found in index.js', () => {
    const componentsToCheck = Object.keys(exportedComponents).filter(name => componentsToSkip.indexOf(name) === -1);

    componentsToCheck.map(name =>
      expect(fs.readFileSync(path.resolve(__dirname, '../', name + '.js'), {encoding: 'utf8'}))
        .toBe(`module.exports = require('./dist/src/${name}');\n`));
  });
});
