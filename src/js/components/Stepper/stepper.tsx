import * as React from 'react';
import styled from 'styled-components';
import Step from './step';

/**
 * Stepper UI Compoment
 * currentStep은 0부터 시작
 */
export interface StepperProps {
  className?: string;
  currentStep: number;
  totalSteps: string[];
}
export const Stepper = (props: StepperProps) => {
  const listElements: JSX.Element[] = props.totalSteps.map((step: string, index: number) => {
    let state: string = 'disabled';

    if (props.currentStep === index) {
      state = 'active';
    } else if (props.currentStep > index) {
      state = 'resolved';
    }

    return (
      <Step
        key={step}
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
