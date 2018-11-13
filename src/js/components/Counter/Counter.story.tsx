import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Counter from './index';

interface CounterStoryState {
  value: number;
}

interface CounterStory2State {
  value1: number;
  value2: number;
  value3: number;
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
        <Counter disableDecrease value={this.state.value1} onChange={(value: number) => {
          action('Counter 1 value changed')(value);
          this.setState({ value1: value });
        }} />
        <Counter disableIncrease value={this.state.value2} onChange={(value: number) => {
          action('Counter 2 value changed')(value);
          this.setState({ value2: value });
        }} />
        <Counter disableDecrease disableIncrease value={this.state.value3} onChange={(value: number) => {
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
