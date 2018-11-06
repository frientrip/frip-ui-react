import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Toggle from './index';

interface ToggleStoryState {
  isToggleFail: boolean;
  value: boolean;
  disabled: boolean;
  result: string;
}

class ToggleStory extends React.Component<{}, ToggleStoryState> {
  state = {
    isToggleFail: false,
    value: false,
    disabled: false,
    result: '',
  };

  constructor(props: {}) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }

  /**
   * 토글 처리 함수
   *
   * @private
   * @memberof ToggleStory
   */
  private handleToggle() {
    action('toggle')(this.state.value);
    this.setState({ disabled: true, result: 'loading...' });
    setTimeout(() => {
      this.setState((prevState: ToggleStoryState) => ({ value: this.state.isToggleFail ? prevState.value : !prevState.value, disabled: false, result: this.state.isToggleFail ? 'fail' : 'success' }));
    },         1000);
  }

  public render() {
    return (
      <div>
        <label>
          <input type="checkbox" checked={!this.state.isToggleFail} onClick={() => this.setState((state: ToggleStoryState) => ({ isToggleFail: !state.isToggleFail }))} />
          토글 액션 성공
        </label>
        <Toggle disabled={this.state.disabled} value={this.state.value} onClick={this.handleToggle}/>
        result: {this.state.result}
      </div>
    );
  }
}

storiesOf('Toggle', module)
  .add('Toggle default', () => {
    return (<ToggleStory />);
  });
