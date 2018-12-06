import Quill, { DeltaStatic, Sources } from 'quill';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import 'quill/dist/quill.snow.css';
import * as React from 'react';
import styled from 'styled-components';

interface TextEditorProps {
  defaultValue: string;
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
  overflow: scroll;
`;

const Toolbar = styled.div`
  flex: 0 0 auto;
  width: 100%;
`;

const Body = styled.div`
  flex: 1 1 0;
  height: 0 !important;
`;

export default class TextEditor extends React.Component<TextEditorProps, TextEditorState> {
  editorBody: React.RefObject<HTMLDivElement>;

  constructor(props: TextEditorProps) {
    super(props);

    this.editorBody = React.createRef<HTMLDivElement>();

    this.state = {
      quill: null,
    };
  }

  public componentDidMount() {
    if (this.state.quill === null) {
      if (this.editorBody.current) {
        // 초기값 입력
        this.editorBody.current.innerHTML = this.props.defaultValue;
      }

      const quill = new Quill('#editor', {
        modules: {
          toolbar: {
            container: '#editor-toolbar',
          },
        },
        theme: 'snow',
      });

      quill.on('text-change', (delta: DeltaStatic, oldDelta: DeltaStatic, source: Sources) => {
        console.log(delta, source);

        const converter = new QuillDeltaToHtmlConverter(quill.getContents().ops!, {
          inlineStyles: true,
        });
        this.props.onChange(converter.convert());
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
        <Body id="editor" innerRef={this.editorBody} />
      </Wrapper>
    );
  }
}
