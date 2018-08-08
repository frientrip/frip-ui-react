import * as React from 'react';
import styled from 'styled-components';
import color from '../Color';
import IconCheck from '../../assets/svgs/ic-check-white.svg';

/**
 * 단일 단계 컴포넌트
 */
interface StepProps {
  className?: string;
  children?: React.ReactChild;
  state: string; // resolved | active | disabled
  index: number;
}
const Step = (props: StepProps) => {
  const stepIndex = props.state === 'resolved'
    ? (<div className="step-index" dangerouslySetInnerHTML={{ __html: IconCheck }} />)
    : (<div className="step-index">{props.index + 1}</div>);
  return (
    <li className={props.className}>
      {stepIndex}
      {props.children}
    </li>
  );
};
const StyledStep = styled(Step)`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 0;
  align-items: center;
  height: 60px;
  color: ${p => p.state === 'disabled' ? color.silver : color.primary};

  .step-index {
    margin-bottom: 4px;
    width: 32px;
    height: 32px;
    padding: 4px;
    border-radius: 100%;
    color: white;
    background-color: ${p => p.state === 'disabled' ? color.silver : color.primary};
    text-align: center;
    line-height: 24px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 16px;
    right: -35%;
    display: block;
    width: 70%;
    height: 2px;
    background-color: ${p => p.state !== 'resolved' ? color.silver : color.primary};
    z-index: -1;
  }
`;

/**
 * Stepper UI Compoment
 * currentStep은 0부터 시작
 */
interface Props {
  className?: string;
  currentStep: number;
  totalSteps: string[];
}
interface State {
  currentStep: number;
  totalSteps: string[];
}
class Stepper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentStep: props.currentStep,
      totalSteps: props.totalSteps,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const newState: State = {
      currentStep: nextProps.currentStep,
      totalSteps: nextProps.totalSteps,
    };
    this.setState(newState);
  }

  render() {
    const listElements: JSX.Element[] = this.state.totalSteps.map((step: string, index: number) => {
      let state: string = 'disabled';

      if (this.state.currentStep === index) {
        state = 'active';
      } else if (this.state.currentStep > index) {
        state = 'resolved';
      }

      return (
        <StyledStep
          key={step}
          state={state}
          index={index}
        >
          {step}
        </StyledStep>
      );
    });

    return (
      <ol className={this.props.className}>
        {listElements}
      </ol>
    );
  }
}
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
