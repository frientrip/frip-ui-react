import * as React from 'react';
import styled from 'styled-components';
import '../../../css/reset.css';
import MinusIcon from '../../assets/svgs/minus-black.svg';
import PlusIcon from '../../assets/svgs/plus-black.svg';
import colors from '../Color';

interface CounterProps {
  value: number;
  onChange: (value: number) => any;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: solid 1px #e6e6e6;
  border-radius: 4px;
  width: 180px;
  height: 40px;
`;

const ControlButton = styled.div`
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  padding: 12px;
  line-height: 16px;

  &:hover {
    background-color: ${colors.veryLightBlue};
  }
  &:active {
    background-color: ${colors.babyBlue}
  }
`;

const Value = styled.input`
  width: 100px;
  border: 0;
  border-left: solid 1px #e6e6e6;
  border-right: solid 1px #e6e6e6;
  padding: 9px 16px;
  font-size: 14px;
  text-align: center;
`;

const Counter: React.SFC<CounterProps> = (props) => {
  return (
    <Wrapper>
      <ControlButton dangerouslySetInnerHTML={{ __html: MinusIcon }} onClick={() => props.onChange(props.value - 1)} />
      <Value type="number" value={props.value} onChange={event => props.onChange(Number(event.target.value))} onWheel={e => e.preventDefault()} />
      <ControlButton dangerouslySetInnerHTML={{ __html: PlusIcon }} onClick={() => props.onChange(props.value + 1)} />
    </Wrapper>
  );
};

export default Counter;
