import { storiesOf } from '@storybook/react';
import React from 'react';
import TextEditor from './index';

class TextEditorStory extends React.Component<{}, { value: string }> {
  state = {
    value: '<p><strong>볼드</strong><br><em>이텔릭</em><br><u>밑줄</u><br></p><ol><li>번호 목록</li><li>번호 목록</li></ol><p><br></p><ul><li>그냥 목록</li><li>그냥 목록</li></ul><p><br>왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.왼쪽 졍렬입니다.<br></p><p style="text-align:center">가운데 정렬</p><p style="text-align:right">오른쪽 정렬</p><p style="text-align:justify">양쪽 정렬 ...?왜 이건 안되냐... ㅁㄴㅇㄹ양쪽 정렬 ...?왜 이건 안되냐... ㅁㄴㅇㄹ양쪽 정렬 ...?왜 이건 안되냐... ㅁㄴㅇㄹ양쪽 정렬 ...?왜 이건 안되냐... ㅁㄴㅇㄹ양쪽 정렬 ...?왜 이건 안되냐... ㅁㄴㅇㄹ양쪽 정렬 ...?왜 이건 안되냐... ㅁㄴㅇㄹ양쪽 정렬 ...?왜 이건 안되냐... ㅁㄴㅇㄹ양쪽 정렬 ...?왜 이건 안되냐... ㅁㄴㅇㄹ양쪽 정렬 ...?왜 이건 안되냐... ㅁㄴㅇㄹ양쪽 정렬 ...?왜 이건 안되냐... ㅁㄴㅇㄹ양쪽 정렬 ...?왜 이건 안되냐... ㅁㄴㅇㄹ양쪽 정렬 ...?왜 이건 안되냐... ㅁㄴㅇㄹ</p><p style="text-align:justify"><br></p><p style="text-align:justify"><a href="https://www.youtube.com" target="_blank">유튜브로 가기</a></p><p style="text-align:justify"><br></p><p style="text-align:justify"><img src="https://image.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg"></p><p style="text-align:justify"><br></p><iframe frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/tKzwfsKPB8I?showinfo=0"></iframe><p style="text-align:justify"><br></p>',
  };

  public render() {
    return (
      <div style={{ display: 'flex', height: '300px' }}>
        <TextEditor value={this.state.value} onChange={(value: string) => this.setState({ value })} />
        <div style={{ width: '50%' }}>
          본문
          <div dangerouslySetInnerHTML={{ __html: this.state.value }} />
        </div>
      </div>
    );
  }
}

storiesOf('Text Editor', module)
  .add('Text Editor Default', () => {
    return (<TextEditorStory />);
  });
