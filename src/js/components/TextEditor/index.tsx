import Quill, { Delta, DeltaStatic, Sources } from 'quill';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import 'quill/dist/quill.snow.css';
import * as React from 'react';
import styled from 'styled-components';

interface TextEditorProps {
  defaultValue?: string;
  onChange: (value: string) => any;
  uploader?: (file: File) => Promise<string>; // 파일을 받아서 URL 리턴
  onCatchUploaderError?: (e: Error) => any;
}

interface TextEditorState {
  quill: Quill|null;
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 0;
  width: 100%;
  overflow: auto;
`;

const Toolbar = styled.div`
  flex: 0 0 auto;
  width: 100%;
`;

const Body = styled.div`
  flex: 1 1 auto;
  overflow: auto;
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
    const { defaultValue, onChange, uploader, onCatchUploaderError } = this.props;
    const { quill } = this.state;

    if (quill === null) {
      if (this.editorBody.current) {
        // 초기값 입력
        this.editorBody.current.innerHTML = defaultValue || '';
        defaultValue && onChange(defaultValue);
      }

      const quill = new Quill('#editor', {
        modules: {
          toolbar: {
            container: '#editor-toolbar',
          },
        },
        theme: 'snow',
      });

      // quill 이벤트 핸들러 추가
      quill.on('text-change', (delta: DeltaStatic, oldDelta: DeltaStatic, source: Sources) => {
        if (uploader && delta.ops && delta.ops.filter(op => op.insert && op.insert.image).length > 0 && source === 'user') {
          // 업로더가 존재하고 사용자가 이미지를 올린 경우 업로더에게서 URL을 받고, 올린 이미지로 바꿔치기
          const DeltaInstance: typeof Delta = Quill.import('delta'); // HACK
          const imageOps = delta.ops.filter(op => op.insert !== undefined);
          const retainOps = delta.ops.filter(op => op.retain !== undefined);

          if (imageOps.length) {
            uploader(imageOps[0].insert.image)
              .then((url) => {
                const newImage = new DeltaInstance()
                  .retain(retainOps.length ? retainOps[0].retain! : 0)
                  .delete(1)
                  .insert({ image: url });
                quill.updateContents(newImage, 'api');
              })
              .catch((e) => {
                // 못 올라간 이미지 제거
                const newImage = new DeltaInstance()
                  .retain(retainOps.length ? retainOps[0].retain! : 0)
                  .delete(1);
                quill.updateContents(newImage, 'api');

                if (onCatchUploaderError !== undefined) {
                  onCatchUploaderError(e);
                }
              });
          }
        }

        const converter = new QuillDeltaToHtmlConverter(quill.getContents().ops!, {
          inlineStyles: true,
        });

        onChange(converter.convert());
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
