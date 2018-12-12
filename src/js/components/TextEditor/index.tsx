import Quill, { Delta, DeltaStatic, Sources } from 'quill';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import 'quill/dist/quill.snow.css';
import * as React from 'react';
import styled from 'styled-components';

interface TextEditorProps {
  defaultValue?: string;
  onChange: (value: string) => any;
  uploader?: (file: File) => Promise<string>; // 파일을 받아서 URL 리턴
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
        this.editorBody.current.innerHTML = this.props.defaultValue || '';
        this.props.onChange(this.props.defaultValue);
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
        if (this.props.uploader && delta.ops && delta.ops.filter(op => op.insert && op.insert.image).length > 0 && source === 'user') {
          // 업로더가 존재하고 사용자가 이미지를 올린 경우 업로더에게서 URL을 받고, 올린 이미지로 바꿔치기
          const DeltaInstance: typeof Delta = Quill.import('delta'); // HACK

          this.props.uploader(delta.ops[1].insert.image)
            .then((url) => {
              const newImage = new DeltaInstance()
                .retain(delta.ops![0].retain!)
                .delete(1)
                .insert({ image: url });
              quill.updateContents(newImage, 'api');
            });
        }

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
