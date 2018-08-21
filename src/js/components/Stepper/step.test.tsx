import React from 'react';
import { mount, shallow } from 'enzyme';
import { Step, StepSymbol } from './step';

export default describe('Step Default', () => {
  it('주어진 제목을 표시해야한다.', () => {
    const mockTitle: string = 'Hello, World';
    const index: number = 1;
    const wrapper = shallow(<Step state="disabled" index={index} title={mockTitle} />);

    // HACK: 제목에서 <Styled(..) />를 제거하고 비교
    expect(wrapper.text().replace(/<[A-Za-z()]* \/>/g, '')).toEqual(mockTitle);
    wrapper.setProps({ state: 'active' });
    expect(wrapper.text().replace(/<[A-Za-z()]* \/>/g, '')).toEqual(mockTitle);
    wrapper.setProps({ state: 'resolved' });
    expect(wrapper.text().replace(/<[A-Za-z()]* \/>/g, '')).toEqual(mockTitle);
  });

  it('주어진 index + 1값이나 icon을 표시합니다.', () => {
    const mockTitle: string = 'Hello, World';
    const index: number = 1;
    const wrapper = mount(<Step state="disabled" index={index} title={mockTitle} />);

    expect(wrapper.find(StepSymbol).text()).toEqual(`${index + 1}`);
    wrapper.setProps({
      state: 'active',
      index: index + 1,
    });
    expect(wrapper.find(StepSymbol).text()).toEqual(`${index + 2}`);
    wrapper.setProps({
      state: 'resolved',
      index: index + 1,
    });
    expect(wrapper.find(StepSymbol).text()).toEqual('test-file-stub');
  });

  // TODO: state에 따라 스타일 제대로 들어가는지 테스트
});
