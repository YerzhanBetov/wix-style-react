import React from 'react';
import story from '../utils/Components/Story';

import component from 'wix-style-react/Badge';
import source from '!raw-loader!wix-style-react/Badge/Badge';
import readmeTestkit from '../../src/Badge/README.TESTKIT.md';

import CodeExample from '../utils/Components/CodeExample';

import DefaultBadgeExample from './DefaultBadge';
import DefaultBadgeExampleRaw from '!raw-loader!./DefaultBadge';

import RectangleBadgeExample from './RectangleBadge';
import RectangleBadgeExampleRaw from '!raw-loader!./RectangleBadge';

import AppearanceBadgeExample from './AppearanceBadge';
import AppearanceBadgeExampleRaw from '!raw-loader!./AppearanceBadge';

import AlignmentBadgeExample from './AlignmentBadge';
import AlignmentBadgeExampleRaw from '!raw-loader!./AlignmentBadge';

story({
  category: 'Core',
  name: 'Badge',
  readmeTestkit,
  source,
  component,
  componentProps: {
    children: 'I\'m a Badge!'
  },
  examples: (
    <div>
      <CodeExample title="Default" code={DefaultBadgeExampleRaw}>
        <DefaultBadgeExample/>
      </CodeExample>

      <CodeExample title="Shape (Rectangle)" code={RectangleBadgeExampleRaw}>
        <RectangleBadgeExample/>
      </CodeExample>

      <CodeExample title="Appearance" code={AppearanceBadgeExampleRaw}>
        <AppearanceBadgeExample/>
      </CodeExample>

      <CodeExample title="Alignment" code={AlignmentBadgeExampleRaw}>
        <AlignmentBadgeExample/>
      </CodeExample>
    </div>
  )
});
