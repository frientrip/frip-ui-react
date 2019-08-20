import * as React from 'react';
import styled from 'styled-components';
import color from '../Color/index';

interface RadioOptionProps {
  value: string;
  name: string;
  checked: boolean;
  disabled: boolean;
  baseLength?: string;
  description?: string;
  tabIndex?: number;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const CustomRadio = styled.div<{ checked: boolean, disabled: boolean }>`
  display: inline-flex;
  position: relative;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid ${({ disabled }) => (disabled ? color.white : color.pinkishGrey)};
  background-color: ${color.pureWhite};
  margin-right: 10px;
  justify-content: center;
  align-items: center;

  &:after {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ checked }) => (checked ? color.primary : 'transparent')};
  }
`;

const OptionLabel = styled.div<{ disabled: boolean }>`
  display: block;
  height: 40px;
  line-height: 40px;
  color: ${({ disabled }) => (disabled ? color.white : 'inherit')};
`;

const RadioInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`;

const OptionDescription = styled.div`
  margin-top: 10px;
  line-height: 1.71;
  padding-left: 32px;
  font-size: 14px;
  color: #9b9b9b;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  white-space: pre-line;
`;

const RadioOptionWrapper = styled.label<{ baseLength?: string, disabled?: boolean }>`
  flex-basis: ${({ baseLength }) => (baseLength ? baseLength : 'auto')};
  margin-bottom: 10px;
  min-height: 40px;
  font-size: 14px;
  color: ${color.black};
  cursor: pointer;

  &:hover {
    ${OptionLabel} {
      color: ${({ disabled }) => (disabled ? color.white : color.primary)};
    }

    ${CustomRadio} {
      border-color: ${color.primary};
      background-color: ${({ disabled }) => (disabled ? color.pureWhite : 'rgba(51, 153, 255, 0.2)')};
    }
  }
`;

const RadioOption: React.SFC<RadioOptionProps> = ({ value, name, checked, baseLength, disabled, description, tabIndex, onChange, children }) => (
  <RadioOptionWrapper
    baseLength={baseLength}
    htmlFor={name}
  >
    <OptionLabel
      disabled={disabled}
    >
      <CustomRadio
        checked={checked}
        disabled={disabled}
      />

      <RadioInput
        tabIndex={tabIndex}
        type="radio"
        id={name}
        name={name}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />

      {children}
    </OptionLabel>

    {
      description && (
        <OptionDescription>
          {description}
        </OptionDescription>
      )
    }
  </RadioOptionWrapper>
);

export default RadioOption;
