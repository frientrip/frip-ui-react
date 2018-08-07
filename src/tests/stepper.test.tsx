import React from 'react';
import { shallow } from 'enzyme';
import Stepper from '../js/components/Stepper';

it('주어진 step만큼의 list가 생성되어야 한다.', () => {
  const mockSteps = ['기본 정보 입력', '세부 사항 및 일정', '프립 소개 및 홍보', '추가 옵션'];
  const wrapper = shallow(<Stepper currentStep={1} totalSteps={mockSteps}/>);
  expect(wrapper.find('li').length).toEqual(mockSteps.length); // 4
});

it('주어진 제목이 모두 표시된다.', () => {
  const mockSteps = ['기본 정보 입력', '세부 사항 및 일정', '프립 소개 및 홍보', '추가 옵션'];
  const wrapper = shallow(<Stepper currentStep={1} totalSteps={mockSteps} />);
  expect(wrapper.find('li').map((node) => {
    return node.text();
  })).toEqual(mockSteps); // 4
});
