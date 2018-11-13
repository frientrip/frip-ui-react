import * as React from 'react';
import styled from 'styled-components';
import '../../../css/reset.css';
import MinusIcon from '../../assets/svgs/minus-black.svg';
import PlusIcon from '../../assets/svgs/plus-black.svg';
import colors from '../Color';

interface CounterProps {
  value: number;
  onChange: (value: number) => any;
  disableDecrease?: boolean;
  disableIncrease?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: solid 1px #e6e6e6;
  border-radius: 4px;
  width: 182px;
  color: ${colors.black};
`;

const ControlButton = styled.div<{ disabled?: boolean }>`
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  padding: 12px;
  line-height: 16px;

  ${({ disabled }) => (disabled ? `
    path {
      fill: #e6e6e6;
    }
  ` : `
    path {
      fill: #4a4a4a;
    }

    &:hover {
      background-color: ${colors.veryLightBlue};
    }
    &:active {
      background-color: ${colors.babyBlue}
    }
  `)}
`;

const Value = styled.input`
  width: 100px;
  height: 40px;
  border: 0;
  border-left: solid 1px #e6e6e6;
  border-right: solid 1px #e6e6e6;
  padding: 9px 16px;
  font-size: 14px;
  text-align: center;
`;

const Counter: React.SFC<CounterProps> = (props) => {
  const { value, onChange, disableDecrease, disableIncrease } = props;
  const handleDirectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);

    if (disableDecrease && newValue < value) {
      return;
    }
    if (disableIncrease && newValue > value) {
      return;
    }

    onChange(newValue);
  };

  return (
    <Wrapper>
      <ControlButton
        disabled={disableDecrease}
        dangerouslySetInnerHTML={{ __html: MinusIcon }}
        onClick={disableDecrease ? undefined : () => onChange(value - 1)}
      />
      <Value
        type="number"
        value={value}
        onChange={handleDirectChange}
        onWheel={e => e.preventDefault()}
      />
      <ControlButton
        disabled={disableIncrease}
        dangerouslySetInnerHTML={{ __html: PlusIcon }}
        onClick={disableIncrease ? undefined : () => onChange(value + 1)}
      />
    </Wrapper>
  );
};

export default Counter;
