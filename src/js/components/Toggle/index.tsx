import * as React from 'react';
import styled from 'styled-components';

interface ToggleProps {
  disabled?: boolean;
  value: boolean;
  onClick: () => any;
}

const Wrapper = styled.div`
  width: 64px;
  height: 32px;

  rect, circle {
    transition: all 0.2s;
  }
`;

const Toggle: React.SFC<ToggleProps> = (props) => {
  const value = props.disabled ? !props.value : props.value;
  return (
    <Wrapper onClick={props.disabled ? undefined : props.onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="32"
        viewBox="0 0 64 32"
      >
        <g fill="none" fillRule="evenodd">
          <rect
            width={value ? '64' : '63'}
            height={value ? '32' : '31'}
            x={value ? '0' : '.5'}
            y={value ? '0' : '.5'}
            fill={value ? '#39F' : '#D9E0E8'}
            stroke={value ? '' : '#D9E0E8'}
            rx={value ? '16' : '15.5'}
          />
          <circle
            cx={value ? '48' : '16'}
            cy="16"
            r="14"
            opacity={props.disabled ? '0.5' : '1'}
            fill="#FFF"
          />
        </g>
      </svg>
    </Wrapper>
  );
};

export default Toggle;
