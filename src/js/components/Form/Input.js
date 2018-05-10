import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../Color';

import DeleteIcon from '../../assets/svgs/ic-delete-l-grey.svg';

const propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  message: PropTypes.string,
  required: PropTypes.bool,
};

const defaultProps = {
  type: 'text',
  onChange: () => {},
  label: '',
  message: '',
  required: false,
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
  border: 1px solid ${color.lightGrey};
  transition: border 0.2s;

  &:focus {
    border: 1px solid ${color.primary};
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
`;

const MessageWrapper = styled.div`
  width: 100%;
  margin-top: 2px;
  font-size: 12px;
  color: ${color.grey};
  font-weight: 300;
`;

const LabelWrapper = styled.div`
  position: relative;
  color: ${color.black};
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
      value: '',
    };

    this.inputRef = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetInput = this.resetInput.bind(this);
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
  }
  render() {
    const {
      type,
      label,
      required,
      message,
    } = this.props;

    return (
      <Wrapper>
        <LabelWrapper>
          {label}
          {required && <RequiredWrapper> *</RequiredWrapper>}
        </LabelWrapper>
        <InputWrapper>
          <Input
            type={type}
            onChange={this.handleInputChange}
            value={this.state.value}
            innerRef={this.inputRef}
          />
          {
            this.state.value && <IconWrapper
              dangerouslySetInnerHTML={{ __html: DeleteIcon }}
              onClick={this.resetInput}
            />
          }
        </InputWrapper>
        <MessageWrapper>
          {message}
        </MessageWrapper>
      </Wrapper>
    );
  }
}

InputComponent.propTypes = propTypes;
InputComponent.defaultProps = defaultProps;

export default InputComponent;
