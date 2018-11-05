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
            width={props.value ? '64' : '63'}
            height={props.value ? '32' : '31'}
            x={props.value ? '0' : '.5'}
            y={props.value ? '0' : '.5'}
            fill={props.value ? '#39F' : '#D9E0E8'}
            stroke={props.value ? '' : '#D9E0E8'}
            rx={props.value ? '16' : '15.5'}
          />
          <circle
            cx={props.value ? '48' : '16'}
            cy="16"
            r="14"
            fill="#FFF"
          />
        </g>
      </svg>
    </Wrapper>
  );
};

export default Toggle;
