import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { specs } from 'storybook-addon-specifications';
import { ButtonPrimary } from '../Button';
import Stepper from './';
import stepperTestSuite from './stepper.test';

class StepperDemo extends React.Component<{}, {step: number, steps: string[]}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      step: 0,
      steps: ['기본 정보 입력', '세부 사항 및 일정', '프립 소개 및 홍보', '추가 옵션'],
    };
  }

  /**
   * stepper의 상태를 이전 단계로 바꾼다.
   */
  onClickPrevious = (event: JSX.Element) => {
    if (this.state.step > 0) {
      action('go to previous step')(event);
      this.setState({ step: this.state.step - 1 });
    }
  }

  /**
   * stepper의 상태를 다음 단계로 바꾼다.
   */
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
        <Stepper currentStep={currentIndex} stepLabels={mockSteps} />
        <ButtonPrimary onClick={this.onClickPrevious} labelText="이전" disabled={currentIndex === 0} />
        <ButtonPrimary onClick={this.onClickNext} labelText="다음" disabled={currentIndex === this.state.steps.length} />
        {this.state.step + 1} 단계
      </div>
    );
  }
}

storiesOf('Stepper', module)
  .add('Stepper Default', () => {
    specs(() => stepperTestSuite);
    return (
      <StepperDemo />
    );
  });
