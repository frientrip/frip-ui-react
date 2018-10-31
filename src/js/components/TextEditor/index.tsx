import Quill from 'quill';
import * as React from 'react';
import { Helmet } from 'react-helmet';
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
        <Helmet>
          <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
        </Helmet>
        <div id="editor" dangerouslySetInnerHTML={{ __html: this.props.value }} />
      </Wrapper>
    );
  }
}
