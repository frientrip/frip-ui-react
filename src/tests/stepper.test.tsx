import React from 'react';
import { shallow, mount } from 'enzyme';
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

it('현재 step은 활성화 되어있다.', () => {
  // 활성화의 기준은 active class로.
  const ACTIVE_STEP_INDEX = 1;
  const mockSteps = ['기본 정보 입력', '세부 사항 및 일정', '프립 소개 및 홍보', '추가 옵션'];
  const wrapper = shallow(<Stepper currentStep={ACTIVE_STEP_INDEX} totalSteps={mockSteps} />);

  expect(wrapper.find('.active').length).toBe(1);
  expect(wrapper.find('.active').text()).toBe(mockSteps[ACTIVE_STEP_INDEX]);
});

it('현재 step을 변경할 수 있다.', () => {
  const mockSteps = ['기본 정보 입력', '세부 사항 및 일정', '프립 소개 및 홍보', '추가 옵션'];
  const wrapper = mount(<Stepper currentStep={0} totalSteps={mockSteps} />);
  expect(wrapper.find('.active').text()).toBe(mockSteps[0]);
  wrapper.setProps({ currentStep: 2 });
  expect(wrapper.find('.active').text()).toBe(mockSteps[2]);
});

it('현재 step 이전 step은 해결됨 상태를 가진다.', () => {
  // 활성화의 기준은 resolved class로.
  const ACTIVE_STEP_INDEX = 2;
  const mockSteps = ['기본 정보 입력', '세부 사항 및 일정', '프립 소개 및 홍보', '추가 옵션'];
  const wrapper = shallow(<Stepper currentStep={ACTIVE_STEP_INDEX} totalSteps={mockSteps} />);
  expect(wrapper.find('.resolved').map((element) => {
    return element.text();
  })).toEqual(mockSteps.slice(0, ACTIVE_STEP_INDEX));
});
