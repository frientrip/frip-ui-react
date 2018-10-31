import { storiesOf } from '@storybook/react';
import React from 'react';
import TextEditor from './index';

class TextEditorStory extends React.Component<{}, { value: string }> {
  state = {
    value: '',
  };

  public render() {
    return (
      <TextEditor value={this.state.value} onChange={(value: string) => this.setState({ value })} />
    );
  }
}

storiesOf('Text Editor', module)
  .add('Text Editor Default', () => {
    return (<TextEditorStory />);
  });
