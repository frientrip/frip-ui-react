import { find as _find } from 'lodash';
import Quill, { Delta, DeltaStatic, Sources } from 'quill';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import 'quill/dist/quill.snow.css';
import * as React from 'react';
import styled from 'styled-components';

interface TextEditorProps {
  defaultValue?: string;
  onChange: (value: string) => any;
  uploader?: (file: File) => Promise<string>; // 파일을 받아서 URL 리턴
  onError?: (e: any) => void;
  onCatchUploaderError?: (e: Error) => any;
}

interface TextEditorState {
  quill: Quill|null;
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 0%; /* HACK: for IE */
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
  static readonly YOUTUBE_REG_EX = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/;
  editorBody: React.RefObject<HTMLDivElement>;

  constructor(props: TextEditorProps) {
    super(props);

    this.editorBody = React.createRef<HTMLDivElement>();

    this.state = {
      quill: null,
    };

    this.handleQuillTextChange = this.handleQuillTextChange.bind(this);
  }

  public componentDidMount() {
    const { defaultValue, onChange } = this.props;
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
      quill.on('text-change', this.handleQuillTextChange);
      this.setState({ quill });
    }
  }

  /**
   * quill text-change 이벤트가 발생했을 때 처리 함수
   * @param delta
   * @param oldDelta
   * @param source
   */
  private handleQuillTextChange(delta: DeltaStatic, oldDelta: DeltaStatic, source: Sources) {
    const { onChange, uploader, onError, onCatchUploaderError } = this.props;
    const { quill } = this.state;

    if (quill === null) {
      if (onError) {
        onError(new TypeError('quill 인스턴스가 null입니다.'));
      }
      return;
    }

    if (delta.ops !== undefined && source === 'user') {
      // operation이 존재하고, 사용자의 시행일 경우
      const retainOp = _find(delta.ops, op => op.retain !== undefined);
      const DeltaInstance: typeof Delta = Quill.import('delta'); // HACK
      const newDelta = new DeltaInstance()
        .retain(retainOp !== undefined ? retainOp.retain! : 0) // retain undefined 아닌 op를 찾았으므로 존재 보장됨
        .delete(1);

      const insertOp = _find(delta.ops, op => op.insert !== undefined);

      if (insertOp) {
        // 삽입 시행이 있을 때

        if (insertOp.insert.video && !TextEditor.YOUTUBE_REG_EX.test(insertOp.insert.video)) {
          // 비디오 URL을 추가했는데, youtube url이 아닐 때
          if (onError) {
            onError(new Error(`유효한 youtube URL이 아닙니다: ${insertOp.insert.video}`));
          }
          quill.updateContents(newDelta, 'api');
        }

        if (insertOp.insert.image && uploader) {
          // 업로더가 존재하고 사용자가 이미지를 올린 경우 업로더에게서 URL을 받고, 올린 이미지로 바꿔치기
          uploader(insertOp.insert.image)
            .then((url) => {
              quill.updateContents(newDelta.insert({ image: url }), 'api');
            })
            .catch((e) => {
              // 못 올라간 이미지 제거
              quill.updateContents(newDelta, 'api');

              if (onCatchUploaderError !== undefined) {
                onCatchUploaderError(e);
              }
            });
        }
      }
    }

    const converter = new QuillDeltaToHtmlConverter(quill.getContents().ops!, {
      inlineStyles: true,
    });

    onChange(converter.convert());
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
