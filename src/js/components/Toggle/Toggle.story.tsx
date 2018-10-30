import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Toggle from './index';

class ToggleStory extends React.Component<any, any> {
  state = {
    value: false,
  };

  render() {
    return (
      <Toggle value={this.state.value} onClick={() => {
        this.setState((prevState: any) => ({ value: !prevState.value }));
        action('toggle')(this.state.value);
      }}/>
    );
  }
}

storiesOf('Toggle', module)
  .add('Toggle Default', () => {
    return (<ToggleStory />);
  });
