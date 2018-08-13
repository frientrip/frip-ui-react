import * as React from 'react';
import styled from 'styled-components';
import color from '../Color';
import IconCheck from '../../assets/svgs/ic-check-white.svg';

/**
 * 단일 단계 컴포넌트
 */
export interface StepProps {
  className?: string;
  children?: React.ReactChild;
  state: string; // resolved | active | disabled
  index: number;
  title: string;
}
export const Step = (props: StepProps) => {
  const stepIndex = props.state === 'resolved'
    ? (<div className="step-index" dangerouslySetInnerHTML={{ __html: IconCheck }} />)
    : (<div className="step-index">{props.index + 1}</div>);
  return (
    <li className={props.className}>
      {stepIndex}
      <div className="step-title">{props.title}</div>
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

export default StyledStep;
