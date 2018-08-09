import { configure } from '@storybook/react';
import { configure as enzymeConfig } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

function loadStories() {
  const req = require.context('../src/js/components', true, /\.story\.+(js|tsx)$/);
  req.keys().forEach(filename => req(filename));
}
enzymeConfig({ adapter: new Adapter() });
configure(loadStories, module);
