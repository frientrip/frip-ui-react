import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Counter from './index';

interface CounterStoryState {
  value: number;
}

class CounterStory extends React.Component<{}, CounterStoryState> {
  state = {
    value: 0,
  };

  public render() {
    return (
      <Counter value={this.state.value} onChange={(value: number) => {
        action('Value changed')(value);
        this.setState({ value });
      }} />
    );
  }
}

storiesOf('Counter', module)
  .add('Counter default', () => {
    return (<CounterStory />);
  });
