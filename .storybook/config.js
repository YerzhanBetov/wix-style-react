import {configure, storiesOf} from '@storybook/react';
import {setOptions} from '@storybook/addon-options';

function loadStories() {
  if (process.env.STORYBOOK_E2E) {
    require('./e2e-styles.scss');
  }

  require('../stories/stories.scss');
  require('./stories');
}

configure(loadStories, module);

setOptions({
  showDownPanel: false,
  name: 'wix-style-react',
  url: 'https://github.com/wix/wix-style-react',
  sidebarAnimations: true
});
