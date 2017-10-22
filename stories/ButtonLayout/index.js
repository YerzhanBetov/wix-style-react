import React from 'react';
import story from '../utils/Components/Story';

import component from 'wix-style-react/ButtonLayout';
import source from '!raw-loader!wix-style-react/ButtonLayout/ButtonLayout';
import readmeTestkit from '../../src/ButtonLayout/README.TESTKIT.md';

story({
  category: 'Core',
  name: 'ButtonLayout',
  source,
  readmeTestkit,
  component,
  componentProps: {
    children: (
      <a
        href="http://www.wix.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{textDecoration: 'inherit'}}
        >
        Link Like Button
      </a>
    )
  }
});
