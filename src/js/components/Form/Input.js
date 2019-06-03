import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../Color';
import fontWeight from '../../../font-weight';

import DeleteIcon from '../../assets/svgs/ic-delete-l-grey.svg';
import ErrorIcon from '../../assets/svgs/ic-danger-red.svg';

const propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  message: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  placeholder: PropTypes.string,
  transparent: PropTypes.bool,
  bigLabel: PropTypes.bool,
  tabIndex: PropTypes.number,
  inputWidth: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  width: PropTypes.string,
  unit: PropTypes.string,
};

const defaultProps = {
  className: '',
  type: 'text',
  onChange: () => {},
  label: '',
  message: '',
  required: false,
  error: false,
  placeholder: '',
  transparent: false,
  bigLabel: false,
  tabIndex: 0,
  disabled: false,
  defaultValue: '',
  width: '100%',
  unit: '',
};

const Wrapper = styled.div`
  width: ${({ width }) => (width)};
  position: relative;
  display: inline-block;
  font-family: 'Spoqa Han Sans', sans-serif;
  margin-bottom: 5px;
  padding-left: ${({ bigLabel }) => (bigLabel ? '155px' : 0)};
`;

const InputWrapper = styled.div`
  position: relative;
  width: ${({ inputWidth }) => (inputWidth || '100%')};
  height: 40px;
  ${({ transparent }) => (transparent ? '' : 'border-radius: 4px;')}
  background-color: ${({ transparent }) => (transparent ? 'transparent' : color.pureWhite)};
  margin-bottom: 10px;
`;

const BorderedContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  padding: 0 16px;
  transition: border 0.2s;

  ${({ onlyBorderBottom, borderColor }) => (onlyBorderBottom
    ? `border-bottom: 0.5px solid ${borderColor};`
    : `border: 1px solid ${borderColor};`
  )}
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  border: none;
  padding: 0;
  font-size: 12px;
  color: ${({ transparent }) => (transparent ? color.pureWhite : color.black)};
  color: ${({ disabled }) => (disabled ? color.grey : null)};
  background-color: ${({ transparent }) => (transparent ? 'transparent' : color.pureWhite)};

  &:focus {
    outline: none;
  }

  &:disabled {
    color: ${color.grey};
    opacity: 1;
  }

  &::placeholder {
    color: ${color.grey};
  }

`;

const Unit = styled.div`
  line-height: 12px;
  text-align: right;
  font-size: 12px;
`;

const IconWrapper = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  right: 24px;
  top: 8px;
  user-select: none;
`;

const IconWrapperVisible = styled(IconWrapper)`
  opacity: 1;
  background-color: ${color.pureWhite};
`;

const MessageWrapper = styled.div`
  width: ${({ width }) => (width || '100%')};
  font-size: 12px;
  line-height: 14px;
  color: ${({ error }) => (error ? color.red : color.grey)};
  font-weight: 300;
`;

const LabelWrapper = styled.div`
  position: ${({ bigLabel }) => (bigLabel ? 'absolute' : 'relative')};
  color: ${({ error }) => (error ? color.red : color.black)};
  font-size: ${({ bigLabel }) => (bigLabel ? '20px' : '14px')}
  font-weight: ${fontWeight.normal};
  min-height: 18px;
  margin-bottom: 16px;
  left: 0;
  z-index: 1;
  top: ${({ bigLabel }) => (bigLabel ? '5px' : '0')};
`;

const RequiredWrapper = styled.span`
  color: ${color.red};
`;

const WordCountWrapper = styled.div`
  position: absolute;
  font-size: 12px;
  right: 15px;
  top: 10px;
`;

const WordCount = styled.span`
  color: ${({ error }) => (error ? color.red : 'inherit')};
`;

class InputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isFocused: false,
      isDirty: false,
    };

    this.inputRef = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFocused = this.handleInputFocused.bind(this);
    this.handleInputBlured = this.handleInputBlured.bind(this);

    this.resetInput = this.resetInput.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (state.value === '' && props.defaultValue && !state.isDirty) {
      props.onChange && props.onChange(props.defaultValue);
      return {
        value: props.defaultValue,
        isDirty: true,
      };
    }
    return state;
  }

  get borderColor() {
    const { transparent, error } = this.props;
    const { isFocused } = this.state;

    if (error) {
      return color.red;
    }

    if (isFocused) {
      return color.primary;
    }

    if (transparent) {
      return color.pureWhite;
    }

    return color.white;
  }

  handleInputChange(e) {
    const val = e.target.value;
    if (this.props.maxLength && val.length > this.props.maxLength) {
      return;
    }

    this.setState({
      value: val,
    });

    this.props.onChange(val, e);
  }

  resetInput() {
    this.inputRef.current.focus();
    this.setState({
      value: '',
    });
    this.props.onChange('');
  }

  handleInputFocused() {
    this.setState({
      isFocused: true,
    });
  }

  handleInputBlured() {
    this.setState({
      isFocused: false,
    });
  }

  render() {
    const {
      className,
      type,
      label,
      required,
      message,
      error,
      placeholder,
      transparent,
      bigLabel,
      tabIndex,
      inputWidth,
      disabled,
      maxLength,
      width,
      unit,
    } = this.props;
    const { isFocused } = this.state;

    return (
      <Wrapper className={className} bigLabel={label && bigLabel} width={width}>
        {
          label &&
          <LabelWrapper bigLabel={bigLabel} error={error}>
            {label}
            {required && <RequiredWrapper> *</RequiredWrapper>}
          </LabelWrapper>
        }
        <InputWrapper inputWidth={inputWidth} transparent={transparent}>
          <BorderedContainer
            onlyBorderBottom={transparent}
            borderColor={this.borderColor}
          >
            <Input
              type={type}
              error={error}
              onChange={this.handleInputChange}
              value={this.state.value}
              innerRef={this.inputRef}
              placeholder={placeholder}
              transparent={transparent}
              tabIndex={tabIndex}
              disabled={disabled}
              maxLength={maxLength}
            />
            {
              unit && (
                <Unit>
                  {unit}
                </Unit>
              )
            }
          </BorderedContainer>
          {
            this.state.value && !maxLength && !error && isFocused && (
              <IconWrapper
                dangerouslySetInnerHTML={{ __html: DeleteIcon }}
                onClick={this.resetInput}
              />
            )
          }
          {
            error && !maxLength && (
              <IconWrapperVisible
                dangerouslySetInnerHTML={{ __html: ErrorIcon }}
                onClick={this.resetInput}
              />
            )
          }
          {
            maxLength && (
              <WordCountWrapper>
                <WordCount
                  error={this.state.value.length > maxLength}
                >
                  {this.state.value.length}
                </WordCount>
                /{maxLength}
              </WordCountWrapper>
            )
          }
        </InputWrapper>
        {
          message && (
            <MessageWrapper error={error} width={inputWidth}>
              {message}
            </MessageWrapper>
          )
        }
      </Wrapper>
    );
  }
}

InputComponent.propTypes = propTypes;
InputComponent.defaultProps = defaultProps;

export default InputComponent;
