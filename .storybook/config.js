import { configure } from '@storybook/react';

function loadStories() {
  const req = require.context('../src/js/components', true, /\.story\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
