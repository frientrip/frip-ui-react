import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Counter from './index';

interface CounterStoryState {
  value: number|null;
}

interface CounterStory2State {
  value1: number|null;
  value2: number|null;
  value3: number|null;
}

class CounterStory extends React.Component<{}, CounterStoryState> {
  state = {
    value: 0,
  };

  public render() {
    return (
      <div>
        <Counter value={this.state.value} onChange={(value: number|null) => {
          action('Value changed')(value);
          this.setState({ value });
        }} />
        Value: {this.state.value}
      </div>
    );
  }
}

class CounterStory2 extends React.Component<{}, CounterStory2State> {
  state = {
    value1: 0,
    value2: 1,
    value3: 2,
  };

  /**
   * render
   */
  public render() {
    return (
      <div>
        <Counter disableDecrease value={this.state.value1} onChange={(value: number|null) => {
          action('Counter 1 value changed')(value);
          this.setState({ value1: value });
        }} />
        <Counter disableIncrease value={this.state.value2} onChange={(value: number|null) => {
          action('Counter 2 value changed')(value);
          this.setState({ value2: value });
        }} />
        <Counter disableDecrease disableIncrease value={this.state.value3} onChange={(value: number|null) => {
          action('Counter 3 value changed')(value);
          this.setState({ value3: value });
        }} />
      </div>
    );
  }
}

storiesOf('Counter', module)
  .add('Counter default', () => {
    return (<CounterStory />);
  })
  .add('Disabled Counters', () => (
    <CounterStory2 />
  ));
