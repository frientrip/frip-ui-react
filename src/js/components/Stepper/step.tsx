import * as React from 'react';
import styled from 'styled-components';
import color from '../Color';
import IconCheck from '../../assets/svgs/ic-check-white.svg';

/**
 * StepSymbol의 Prop 속성
 */
interface StepSymbolProps {
  className?: string;
  symbol: any;
  disabled: boolean;
}

/**
 * 각 step의 Symbol symbol prop으로 표시할 값을 넘긴다.
 * symbol이 number, string이 아니면 html에 넣을 수 있는 값(svg)으로 간주
 * @param props {StepIndexProps}
 */
export const StepSymbol = styled((props: StepSymbolProps) => {
  return ['number', 'string'].includes(typeof props.symbol)
    ? (<div className={props.className}>{props.symbol}</div>)
    : (<div className={props.className} dangerouslySetInnerHTML={{ __html: props.symbol }} />);
})`
  margin-bottom: 4px;
  width: 32px;
  height: 32px;
  padding: 4px;
  border-radius: 100%;
  color: white;
  background-color: ${p => p.disabled ? color.silver : color.primary};
  text-align: center;
  line-height: 24px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

/**
 * 단일 단계 컴포넌트
 */
export type TStepState = 'resolved' | 'active' | 'disabled';

export interface StepProps {
  className?: string;
  children?: React.ReactChild;
  state: TStepState;
  index: number;
  title: string;
}
export const Step = (props: StepProps) => {
  return (
    <li className={props.className}>
      <StepSymbol symbol={props.state === 'resolved' ? IconCheck : props.index + 1} disabled={props.state === 'disabled'} />
      {props.title}
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
