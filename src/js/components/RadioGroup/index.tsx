import bind from 'bind-decorator';
import * as React from 'react';
import styled from 'styled-components';
import fontWeight from '../../../font-weight';
import color from '../Color/index';
import RadioOption from './RadioOption';

type RadioOption = {
  value: string;
  labelText: string;
  description?: string;
  disabled?: boolean;
};

interface RadioGroupProps {
  options: RadioOption[];
  onChange?: (value: string | number) => void;
  labelText?: string;
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

interface RadioGroupState {
  selectedOption: string;
  isDirty: boolean;
}

const Wrapper = styled.div`
  font-family: inherit;
`;

const LabelText = styled.div<{ error?:boolean, bigLabel?:boolean }>`
  color: ${({ error }) => (error ? color.red : color.black)};
  font-size: ${({ bigLabel }) => (bigLabel ? '20px' : '14px')};
  font-weight: ${fontWeight.normal};
  min-height: 18px;
  margin-bottom: 14px;
  left: 0;
  z-index: 1;
  top: ${({ bigLabel }) => (bigLabel ? '5px' : '0')};
`;

const RequiredWrapper = styled.span`
  color: ${color.red};
`;

const RadioOptionListWrapper = styled.div<{ direction?: 'column' | 'row' }>`
  display: flex;
  position: relative;
  flex-wrap: wrap;

  >* {
    margin-bottom: 40px;
  }

  ${({ direction }) => {
    switch (direction) {
      case 'column':
        return `
          flex-direction: column;
        `;
      case 'row':
      default:
        return `
          flex-direction: row;
        `;
    }
  }}
`;

const MessageWrapper = styled.div<{ error?: boolean }>`
  width: 100%;
  font-size: 12px;
  line-height: 12px;
  color: ${({ error }) => (error ? color.red : color.grey)};
  font-weight: 300;
  margin-bottom: 10px;
`;

export default class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {
  constructor(props: RadioGroupProps) {
    super(props);

    this.state = {
      selectedOption: '',
      isDirty: false,
    };
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

  @bind
  private handleOnOptionClick(e: React.FormEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value;

    this.setState({
      selectedOption: newValue,
    });

    if (this.props.onChange && newValue !== '') {
      this.props.onChange(newValue);
    }
  }

  private renderOptionList() {
    const { options, baseLength, tabIndex } = this.props;
    const { selectedOption } = this.state;

    return options.map((option) => {
      const radioInputName = `radio-${option.value}`;

      return (
        <RadioOption
          key={radioInputName}
          value={option.value}
          name={radioInputName}
          checked={selectedOption === option.value}
          disabled={!!option.disabled}
          baseLength={baseLength}
          tabIndex={tabIndex}
          description={option.description}
          onChange={this.handleOnOptionClick}
        >
          {option.labelText}
        </RadioOption>
      );
    });
  }

  public render() {
    const {
      labelText,
      bigLabel,
      error,
      direction,
      required,
      className,
      message,
    } = this.props;

    return (
      <Wrapper className={className}>
        {
          labelText && (
            <LabelText bigLabel={bigLabel} error={error}>
              {labelText}
              {required && <RequiredWrapper> *</RequiredWrapper>}
            </LabelText>
          )
        }

        {
          message && (
            <MessageWrapper error={error}>
              {message}
            </MessageWrapper>
          )
        }

        <RadioOptionListWrapper direction={direction}>
          {this.renderOptionList()}
        </RadioOptionListWrapper>
      </Wrapper>
    );
  }
}
