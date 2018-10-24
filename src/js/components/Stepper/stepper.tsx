import * as React from 'react';
import styled from 'styled-components';
import Step, { TStepState } from './step';

/**
 * Stepper UI Compoment
 * currentStep은 0부터 시작
 */
export interface StepperProps {
  className?: string;
  currentStep: number;
  stepLabels: string[];
}
export const Stepper = (props: StepperProps) => {
  const listElements: JSX.Element[] = props.stepLabels.map((step: string, index: number) => {
    let state: TStepState = 'disabled';

    if (props.currentStep === index) {
      state = 'active';
    } else if (props.currentStep > index) {
      state = 'resolved';
    }

    return (
      <Step
        key={`step-${index}-${step}`}
        state={state}
        index={index}
        title={step}
      />
    );
  });

  return (
    <ol className={props.className}>
      {listElements}
    </ol>
  );
};
const StyledStepper = styled(Stepper)`
  display: flex;
  justify-content: space-between;
  padding: 0;
  list-style: none;
  font-size: 14px;

  li:last-child::after {
    display: none;
  }
`;
export default StyledStepper;
