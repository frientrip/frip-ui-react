import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../Color';

import DeleteIcon from '../../assets/svgs/ic-delete-l-grey.svg';
import ErrorIcon from '../../assets/svgs/ic-danger-red.svg';

const propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  message: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  value: PropTypes.string,
};

const defaultProps = {
  type: 'text',
  onChange: () => {},
  label: '',
  message: '',
  required: false,
  error: false,
  value: '',
};

const Wrapper = styled.div`
  display: inline-block;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: ${color.white};
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  border: none;
  padding: 0 24px 0 16px;
  font-size: 14px;
  color: ${color.black};
  border: 1px solid ${({ error }) => (error ? color.red : color.lightGrey)};
  transition: border 0.2s;

  &:focus {
    border: 1px solid ${({ error }) => (error ? color.red : color.primary)};
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
  background-color: ${color.white};
`;

const MessageWrapper = styled.div`
  width: 100%;
  margin-top: 2px;
  font-size: 12px;
  color: ${({ error }) => (error ? color.red : color.grey)};
  font-weight: 300;
`;

const LabelWrapper = styled.div`
  position: relative;
  color: ${({ error }) => (error ? color.red : color.black)};
  font-size: 12px;
  font-weight: 600;
  min-height: 18px;
  margin-bottom: 5px;
`;

const RequiredWrapper = styled.span`
  color: ${color.red};
`;

class InputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
    };

    this.inputRef = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetInput = this.resetInput.bind(this);
  }
  componentWillReceiveProps({ value }) {
    this.setState({
      value,
    });
  }
  handleInputChange(e) {
    const val = e.target.value;

    if (this.props.value === undefined) {
      this.setState({
        value: val,
      });
    }

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
      type,
      label,
      required,
      message,
      error,
    } = this.props;

    return (
      <Wrapper>
        <LabelWrapper error={error}>
          {label}
          {required && <RequiredWrapper> *</RequiredWrapper>}
        </LabelWrapper>
        <InputWrapper>
          <Input
            type={type}
            error={error}
            onChange={this.handleInputChange}
            value={this.state.value}
            innerRef={this.inputRef}
          />
          {
            this.state.value && !error && <IconWrapper
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
        </InputWrapper>
        <MessageWrapper error={error}>
          {message}
        </MessageWrapper>
      </Wrapper>
    );
  }
}

InputComponent.propTypes = propTypes;
InputComponent.defaultProps = defaultProps;

export default InputComponent;