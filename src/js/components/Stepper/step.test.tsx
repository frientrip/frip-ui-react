import React from 'react';
import { mount } from 'enzyme';
import { Step } from './step';

export default describe('Step Default', () => {
  it('주어진 제목을 표시해야한다.', () => {
    const mockTitle: string = 'Hello, World';
    const wrapper = mount(<Step state="disabled" index={1} title={mockTitle} />);
    expect(wrapper.find('.step-title').text()).toBe(mockTitle);
  });

  it('첫 번째 div tag로 주어진 index를 표시해야한다.', () => {
    const index = 2;
    const wrapper = mount(<Step state="disabled" index={index} title="hello" />);
    expect(wrapper.find('div').first().text()).toBe((index + 1).toString());
  });

  // TODO: state에 따라 스타일 제대로 들어가는지 테스트
});
