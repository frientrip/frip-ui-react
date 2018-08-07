import { configure } from '@storybook/react';

function loadStories() {
  const req = require.context('../src/js/components', true, /\.story\.+(js|tsx)$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
