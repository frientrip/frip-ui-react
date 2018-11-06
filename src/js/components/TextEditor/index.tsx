import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import * as React from 'react';
import styled from 'styled-components';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => any;
}

interface TextEditorState {
  quill: Quill|null;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default class TextEditor extends React.Component<TextEditorProps, TextEditorState> {
  constructor(props: TextEditorProps) {
    super(props);

    this.state = {
      quill: null,
    };
  }

  public componentDidMount() {
    if (this.state.quill === null) {
      const quill = new Quill('#editor', {
        theme: 'snow',
      });
      this.setState({ quill });
    }
  }

  public render() {
    return (
      <Wrapper>
        <div id="editor" dangerouslySetInnerHTML={{ __html: this.props.value }} />
      </Wrapper>
    );
  }
}
