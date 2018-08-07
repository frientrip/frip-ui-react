import React from 'react';
import { storiesOf } from '@storybook/react';
import Stepper from './';

storiesOf('Stepper', module)
  .add('Stepper Default', () => {
    const mockSteps: string[] = ['기본 정보 입력', '세부 사항 및 일정', '프립 소개 및 홍보', '추가 옵션'];

    return (<Stepper currentStep={0} totalSteps={mockSteps} />);
  });
