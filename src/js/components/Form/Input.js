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
  inputWidth: '100%',
  disabled: false,
  defaultValue: '',
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  font-family: 'Spoqa Han Sans', sans-serif;
  margin-bottom: 5px;
  padding-left: ${( { bigLabel }) => (bigLabel ? '155px' : 0)};
`;

const InputWrapper = styled.div`
  position: relative;
  width: ${({ inputWidth }) => (inputWidth)};
  height: 40px;
  ${({ transparent }) => (transparent ? '' : 'border-radius: 4px;')}
  background-color: ${({ transparent }) => (transparent ? 'transparent' : color.pureWhite)};
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  border: none;
  ${({ transparent, error }) => (transparent
    ? `border-bottom: 0.5px solid ${error ? color.red : color.pureWhite};`
    : `border: 1px solid ${error ? color.red : color.white};`
  )}
  padding: 0 24px 0 16px;
  font-size: 12px;
  color: ${({ transparent }) => (transparent ? color.pureWhite : color.black)};
  color: ${({ disabled }) => (disabled ? color.lightGrey : null)};
  transition: border 0.2s;
  background-color: transparent;

  &:focus {
    border-color: ${({ error }) => (error ? color.red : color.primary)};
    outline: none;
  }

  &:focus + div {
    opacity: 1;
  }

`;

const IconWrapper = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  right: 8px;
  top: 8px;
  opacity: 0;
  user-select: none;
`;

const IconWrapperVisible = styled(IconWrapper)`
  opacity: 1;
  background-color: ${color.pureWhite};
`;

const MessageWrapper = styled.div`
  width: 100%;
  font-size: 12px;
  line-height: 12px;
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
  right: 30px;
  top: 10px;
`;

class InputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isDirty: false,
    };

    this.inputRef = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetInput = this.resetInput.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (state.value === '' && props.defaultValue && !state.isDirty) {
      props.onChange && props.onChange(props.defaultValue);
      return {
        value: props.defaultValue,
        isDirty: true,
      }
    }
    return state;
  }
  handleInputChange(e) {
    const val = e.target.value;

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
    } = this.props;

    return (
      <Wrapper className={className} bigLabel={label && bigLabel}>
        {
          label &&
          <LabelWrapper bigLabel={bigLabel} error={error}>
            {label}
            {required && <RequiredWrapper> *</RequiredWrapper>}
          </LabelWrapper>
        }
        <InputWrapper inputWidth={inputWidth} transparent={transparent}>
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
            this.state.value && !maxLength && !error && <IconWrapper
              dangerouslySetInnerHTML={{ __html: DeleteIcon }}
              onClick={this.resetInput}
            />
          }
          {
            error && <IconWrapperVisible
              dangerouslySetInnerHTML={{ __html: ErrorIcon }}
              onClick={this.resetInput}
            />
          }
          {
            maxLength &&
              <WordCountWrapper>
                {this.state.value.length}/{maxLength}
              </WordCountWrapper>
          }
        </InputWrapper>
        {
          message &&
          <MessageWrapper error={error}>
            {message}
          </MessageWrapper>
        }
      </Wrapper>
    );
  }
}

InputComponent.propTypes = propTypes;
InputComponent.defaultProps = defaultProps;

export default InputComponent;
