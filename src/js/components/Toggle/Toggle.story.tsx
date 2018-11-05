import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Toggle from './index';

interface ToggleStoryState {
  value: boolean;
  disabled: boolean;
}

class ToggleStory extends React.Component<{}, ToggleStoryState> {
  state = {
    value: false,
    disabled: false,
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
    this.setState((prevState: any) => ({ value: !prevState.value }));
    action('toggle')(this.state.value);
  }

  public render() {
    return (
      <div>
        <label>
          <input type="checkbox" checked={!this.state.disabled} onClick={() => this.setState((state: ToggleStoryState) => ({ disabled: !state.disabled }))} />
          토글 버튼 활성화
        </label>
        <Toggle disabled={this.state.disabled} value={this.state.value} onClick={this.handleToggle}/>
      </div>
    );
  }
}

storiesOf('Toggle', module)
  .add('Toggle Default', () => {
    return (<ToggleStory />);
  });
