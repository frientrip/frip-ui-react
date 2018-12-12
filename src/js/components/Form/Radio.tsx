import * as React from 'react';
import styled from 'styled-components';
import fontWeight from '../../../font-weight';
import color from '../Color';

const Wrapper = styled.div`
  font-family: inherit;
`;

const LabelText = styled.div<{ error?:boolean, bigLabel?:boolean }>`
  color: ${({ error }) => (error ? color.red : color.black)};
  font-size: ${({ bigLabel }) => (bigLabel ? '20px' : '14px')}
  font-weight: ${fontWeight.normal};
  min-height: 18px;
  margin-bottom: 14px;
  left: 0;
  z-index: 1;
  top: ${({ bigLabel }) => (bigLabel ? '5px' : '0')};
`;

const StyledLabel = styled.label`
  font-family: inherit;
  cursor: pointer;

  &:hover {
    color: ${color.primary};
  }
`;

const RequiredWrapper = styled.span`
  color: ${color.red};
`;

const RadioInputWrapper = styled.div<{ direction?: 'column' | 'row' }>`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-direction: ${({ direction }) => (direction ? direction : 'row')};
`;

const RadioInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`;

const OptionWrapper = styled.div<{ baseLength?: string }>`
  display: inline-flex;
  font-size: 14px;
  color: ${color.black};
  min-height: 40px;
  justify-content: flex-start;
  align-items: center;
  flex-basis: ${({ baseLength }) => (baseLength ? baseLength : 'auto')};
  margin-bottom: 10px;
`;

const CustomRadio = styled.div<{ checked: boolean }>`
  display: inline-flex;
  position: relative;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid ${color.pinkishGrey};
  cursor: pointer;
  background-color: ${color.pureWhite};
  margin-right: 10px;
  justify-content: center;
  align-items: center;

  &:hover {
    border-color: ${color.primary};
    background-color: rgba(51, 153, 255, 0.2);
  }

  &:after {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ checked }) => (checked ? color.primary : 'transparent')};
  }
`;

const OptionDescription = styled.span`
  margin-left: 32px;
  font-size: 14px;
  color: #9b9b9b;
`;

const MessageWrapper = styled.div<{ error?: boolean }>`
  width: 100%;
  font-size: 12px;
  line-height: 12px;
  color: ${({ error }) => (error ? color.red : color.grey)};
  font-weight: 300;
  margin-bottom: 10px;
`;

export type RadioOption = {
  value: string;
  labelText: string;
  description?: string;
};

export interface RadioGroupProps {
  labelText: string;
  options: RadioOption[];
  onChange?: (value: string | number) => void;
  bigLabel?: boolean;
  error?: boolean;
  baseLength?: string;
  direction?: 'column' | 'row';
  required?: boolean;
  className?: string;
  tabIndex?: number;
  defaultValue?: string | number;
  message?: string;
}

export interface RadioGroupState {
  selectedOption: string;
  isDirty: boolean;
}

export default class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {
  constructor(props: RadioGroupProps) {
    super(props);
    this.state = {
      selectedOption: '',
      isDirty: false,
    };

    this.handleOnOptionClick = this.handleOnOptionClick.bind(this);
  }

  static getDerivedStateFromProps(props: RadioGroupProps, state: RadioGroupState) {
    if (state.selectedOption === '' && props.defaultValue && !state.isDirty) {
      props.onChange && props.defaultValue && props.onChange(props.defaultValue);
      return {
        selectedOption: props.defaultValue,
        isDirty: true,
      };
    }
    return state;
  }

  private handleOnOptionClick(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      selectedOption: e.currentTarget.value,
    },            () => {
      if (this.props.onChange && this.state.selectedOption !== '') {
        this.props.onChange(this.state.selectedOption);
      }
    });

  }

  public render() {
    const {
      labelText,
      options,
      bigLabel,
      baseLength,
      error,
      direction,
      required,
      className,
      tabIndex,
      message,
    } = this.props;
    const { selectedOption } = this.state;

    return (
      <Wrapper className={className}>
        {
          labelText &&
          <LabelText bigLabel={bigLabel} error={error}>
            {labelText}
            {required && <RequiredWrapper> *</RequiredWrapper>}
          </LabelText>
        }
        {
          message && 
            <MessageWrapper error={error}>
              {message}
            </MessageWrapper>
        }
        <RadioInputWrapper direction={direction}>
        {
          options.map(option => (
            <OptionWrapper key={option.value} baseLength={baseLength}>
              <StyledLabel key={option.value} htmlFor={`radio-${option.value}`}>
                <CustomRadio checked={selectedOption === option.value}/>
                <RadioInput
                  tabIndex={tabIndex}
                  type="radio"
                  id={`radio-${option.value}`}
                  name={`radio-${option.value}`}
                  value={option.value}
                  checked={selectedOption === option.value}
                  onChange={this.handleOnOptionClick}
                />
                {option.labelText}<br />
                {
                  option.description &&
                  <OptionDescription>{option.description}</OptionDescription>
                }
              </StyledLabel>
            </OptionWrapper>
            ))
        }
        </RadioInputWrapper>
      </Wrapper>
    );
  }
}
