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
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 0;
  width: 100%;
`;

const Toolbar = styled.div`
  flex: 0 0 auto;
  width: 100%;
`;

const Body = styled.div`
  flex: 1 1 0;
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
        modules: {
          toolbar: {
            container: '#editor-toolbar',
          },
        },
        theme: 'snow',
      });
      this.setState({ quill });
    }
  }

  public render() {
    return (
      <Wrapper>
        <Toolbar id="editor-toolbar">
          <div className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
          </div>
          <div className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
            <select className="ql-align">
              <option />
              <option value="center" />
              <option value="right" />
              <option value="justify" />
            </select>
          </div>
          <div className="ql-formats">
            <button className="ql-link" />
            <button className="ql-image" />
            <button className="ql-video" />
          </div>
        </Toolbar>
        <Body id="editor" dangerouslySetInnerHTML={{ __html: this.props.value }} />
      </Wrapper>
    );
  }
}
