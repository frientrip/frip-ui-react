import React from 'react';
import { storiesOf } from '@storybook/react';
import Stepper from './';
import { ButtonPrimary } from '../Button';

class StepperDemo extends React.Component<{}, {step: number, steps: string[]}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      step: 0,
      steps: ['기본 정보 입력', '세부 사항 및 일정', '프립 소개 및 홍보', '추가 옵션'],
    };
  }

  onClickPrevious = () => {
    if (this.state.step > 0) {
      this.setState({ step: this.state.step - 1 });
    }
  }

  onClickNext = () => {
    if (this.state.step < this.state.steps.length) {
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
    return (
      <StepperDemo />
    );
  });
