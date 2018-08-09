import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Stepper from './';
import { Step, StepProps } from './stepper';
import { ButtonPrimary } from '../Button';
import { specs, describe, it } from 'storybook-addon-specifications';
import { mount, ReactWrapper } from 'enzyme';
import expect from 'expect';

class StepperDemo extends React.Component<{}, {step: number, steps: string[]}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      step: 0,
      steps: ['기본 정보 입력', '세부 사항 및 일정', '프립 소개 및 홍보', '추가 옵션'],
    };
  }

  onClickPrevious = (event: JSX.Element) => {
    if (this.state.step > 0) {
      action('go to previous step')(event);
      this.setState({ step: this.state.step - 1 });
    }
  }

  onClickNext = (event: JSX.Element) => {
    if (this.state.step < this.state.steps.length) {
      action('go to next step')(event);
      this.setState({ step: this.state.step + 1 });
    }
  }

  render() {
    const mockSteps: string[] = this.state.steps;

    const currentIndex: number = this.state.step;

    return (
      <div>
        <Stepper currentStep={currentIndex} totalSteps={mockSteps} />
        <ButtonPrimary onClick={this.onClickPrevious} labelText="이전" disabled={currentIndex === 0} />
        <ButtonPrimary onClick={this.onClickNext} labelText="다음" disabled={currentIndex === this.state.steps.length} />
        {this.state.step + 1} 단계
      </div>
    );
  }
}

storiesOf('Stepper', module)
  .add('Stepper Default', () => {
    specs(() => describe('Stepper Default', () => {
      // FIXME:  stepper.test.tsx 코드와 중복
      /**
       * 단일 Step의 state를 반환하는 함수.
       * @param step
       */
      const stepStateMapper: (step: ReactWrapper<StepProps>) => string = step => (step.props() as StepProps).state;

      it('주어진 step만큼의 list가 생성되어야 한다.', () => {
        const mockSteps = ['기본 정보 입력', '세부 사항 및 일정', '프립 소개 및 홍보', '추가 옵션'];
        const wrapper = mount(<Stepper currentStep={1} totalSteps={mockSteps}/>);
        expect(wrapper.find('li').length).toEqual(mockSteps.length); // 4
      });

      it('주어진 제목이 모두 표시된다.', () => {
        const mockSteps = ['기본 정보 입력', '세부 사항 및 일정', '프립 소개 및 홍보', '추가 옵션'];
        const wrapper = mount(<Stepper currentStep={1} totalSteps={mockSteps} />);
        expect(wrapper.find('.step-title').map((node) => {
          return node.text();
        })).toEqual(mockSteps); // 4
      });

      it('현재 step을 기준으로 이전 step은 resolved, 이후 step은 disabled 상태를 가진다.', () => {
        // 활성화의 기준은 active class로.
        const ACTIVE_STEP_INDEX = 1;
        const mockSteps = ['기본 정보 입력', '세부 사항 및 일정', '프립 소개 및 홍보', '추가 옵션'];
        const wrapper = mount(<Stepper currentStep={ACTIVE_STEP_INDEX} totalSteps={mockSteps} />);

        expect(wrapper.find(Step).map(stepStateMapper)).toEqual(['resolved', 'active', 'disabled', 'disabled']);
      });

      it('현재 step을 변경할 수 있다.', () => {
        const mockSteps = ['기본 정보 입력', '세부 사항 및 일정', '프립 소개 및 홍보', '추가 옵션'];
        const wrapper = mount(<Stepper currentStep={0} totalSteps={mockSteps} />);

        expect(wrapper.find(Step).map(stepStateMapper)).toEqual(['active', 'disabled', 'disabled', 'disabled']);
        wrapper.setProps({ currentStep: 2 });
        expect(wrapper.find(Step).map(stepStateMapper)).toEqual(['resolved', 'resolved', 'active', 'disabled']);
      });
    }));
    return (
      <StepperDemo />
    );
  });
