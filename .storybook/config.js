import { configure } from '@storybook/react';
import { configure as enzymeConfig } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { describe, it } from 'storybook-addon-specifications';
import expect from 'expect';

function loadStories() {
  const req = require.context('../src/js/components', true, /\.story\.+(js|tsx)$/);
  req.keys().forEach(filename => req(filename));
}

// test용 함수 바인딩
window.describe = describe;
window.it = it;
window.expect = expect;

enzymeConfig({ adapter: new Adapter() });
configure(loadStories, module);
