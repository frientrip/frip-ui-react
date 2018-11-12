import * as React from 'react';
import styled from 'styled-components';
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
  max-width: 180px;
  height: 40px;
`;

const MinusButton = styled.div`
  width: 40px;
  height: 40px;
  border-right: solid 1px #e6e6e6;
  padding: 12px;
  line-height: 16px;

  &:hover {
    background-color: ${colors.veryLightBlue};
  }
  &:active {
    background-color: ${colors.babyBlue}
  }
`;

const Value = styled.div`
  width: 100px;
  padding: 9px 16px;
  text-align: center;
  user-select: none;
`;

const PlusButton = styled.div`
  width: 40px;
  height: 40px;
  border-left: solid 1px #e6e6e6;
  padding: 12px;
  line-height: 16px;

  &:hover {
    background-color: ${colors.veryLightBlue};
  }
  &:active {
    background-color: ${colors.babyBlue}
  }
`;

const Counter: React.SFC<CounterProps> = (props) => {
  return (
    <Wrapper>
      <MinusButton dangerouslySetInnerHTML={{ __html: MinusIcon }} onClick={() => props.onChange(props.value - 1)} />
      <Value>{props.value}</Value>
      <PlusButton dangerouslySetInnerHTML={{ __html: PlusIcon }} onClick={() => props.onChange(props.value + 1)} />
    </Wrapper>
  );
};

export default Counter;
