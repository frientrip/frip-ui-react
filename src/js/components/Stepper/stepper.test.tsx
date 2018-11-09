import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Step, StepProps } from './step';
import Stepper from './stepper';

export default describe('stepper Default', () => {
  /**
   * 단일 Step의 state를 반환하는 함수.
   * @param step
   */
  const stepStateMapper: (step: ReactWrapper<StepProps>) => string = step => (step.props() as StepProps).state;

  it('li tag 안에 주어진 단계의 제목들을 모두 표시한다.', () => {
    const mockSteps = ['기본 정보 입력', '세부 사항 및 일정', '프립 소개 및 홍보', '추가 옵션'];
    const wrapper = mount(<Stepper currentStep={1} stepLabels={mockSteps}/>);
    expect(wrapper.find('li').map((node, index) => {
      return node.contains(mockSteps[index]);
    })).toEqual([true, true, true, true]);
  });

  it('현재 step을 기준으로 이전 step은 resolved, 이후 step은 disabled 상태를 가진다.', () => {
    // 활성화의 기준은 active class로.
    const ACTIVE_STEP_INDEX = 1;
    const mockSteps = ['기본 정보 입력', '세부 사항 및 일정', '프립 소개 및 홍보', '추가 옵션'];
    const wrapper = mount(<Stepper currentStep={ACTIVE_STEP_INDEX} stepLabels={mockSteps} />);

    expect(wrapper.find(Step).map(stepStateMapper)).toEqual(['resolved', 'active', 'disabled', 'disabled']);
  });

  it('현재 step을 변경할 수 있다.', () => {
    const mockSteps = ['기본 정보 입력', '세부 사항 및 일정', '프립 소개 및 홍보', '추가 옵션'];
    const wrapper = mount(<Stepper currentStep={0} stepLabels={mockSteps} />);

    expect(wrapper.find(Step).map(stepStateMapper)).toEqual(['active', 'disabled', 'disabled', 'disabled']);
    wrapper.setProps({ currentStep: 2 });
    expect(wrapper.find(Step).map(stepStateMapper)).toEqual(['resolved', 'resolved', 'active', 'disabled']);
  });
});
