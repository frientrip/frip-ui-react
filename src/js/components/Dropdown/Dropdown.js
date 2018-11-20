import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../Color';
import ChevronIcon from '../../assets/svgs/ic-chevron-down-black.svg';

const propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const defaultProps = {
  className: '',
  label: '',
  invalid: false,
  disabled: false,
  children: null,
};

const Wrapper = styled.div`
`;

const SelectionWrapper = styled.div`
  display: block;
  position: relative;
  margin: 0;
  width: 100%;
  height: 40px;
  color: ${color.black};
  font-size: 14px;
  cursor: pointer;
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${color.black};
  margin-bottom: 4px;
`;

const Blocker = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: not-allowed;
  background-color: white;
  opacity: 0.7;
  z-index: 100;
`;

const SelectedOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border: 1px solid ${({ invalid }) => (invalid ? color.red : color.white)};
  border-radius: 4px;
  padding: 8px 16px;
  transition: background-color 0.4s;
  background-color: ${({ active }) => (active ? color.white2 : color.pureWhite)};

  >div:first-child {
    flex: 1 1 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    background-color: ${color.white2};
  }

  &:active {
    background-color: ${color.white2};
  }
`;

const ChevronWrapper = styled.div`
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  line-height: 16px;
  cursor: pointer;
  opacity: 1;
  transform: ${({ down }) => (down ? 'rotate(0)' : 'rotate(90deg)')};
  transform: ${({ up }) => (up ? 'rotate(180deg)' : '')};
  transition: opacity 0.4s, transform 0.5s;

  &:hover {
    opacity: 0.3;
  }
`;

const OptionBox = styled.div`
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const Options = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  max-height: 220px;
  background-color: ${color.pureWhite};
  border-radius: 4px;
  border: solid 1px #d9e0e8;
  padding: 10px 0;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: transform 0.2s ease-in-out, opacity 0.2s;
  transform-origin: left top;
  transform: ${({ visible }) => (visible ? 'translateY(0) scale(1,1)' : 'translateY(-10px) scale(1,0)')};
  z-index: 99;
`;

const Option = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  color: ${({ disabled }) => (disabled ? color.white : color.black)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ disabled }) => disabled && `
    cursor: not-allowed;
    user-select: none;
  `}

  &:hover {
    background-color: ${({ disabled }) => (disabled ? color.pureWhite : color.veryLightBlue)};
  }
`;

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }

  handleButtonClick() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  handleOptionClick(selectedOption) {
    this.props.onChange(selectedOption.value);
    this.handleButtonClick();
  }

  render() {
    const {
      label,
      invalid,
      disabled,
      children,
    } = this.props;

    const filteredChildren = React.Children.toArray(children)
      .filter(node => node.type === 'option');

    return (
      <Wrapper className={this.props.className}>
        {
          label ? <Label>{label}</Label> : null
        }
        <SelectionWrapper>
          {
            disabled ? <Blocker /> : null
          }
          <SelectedOption
            invalid={invalid}
            disabled={disabled}
            active={this.state.isOpen}
            onClick={disabled ? null : this.handleButtonClick}
          >
            <div>{this.props.value}</div>
            <ChevronWrapper
              dangerouslySetInnerHTML={{ __html: ChevronIcon }}
              down
              up={this.state.isOpen}
            />
          </SelectedOption>
          <Options
            visible={this.state.isOpen}
          >
            <OptionBox>
              {
                filteredChildren.map(option => (
                  <Option
                    key={option.props.value}
                    disabled={option.props.disabled}
                    onClick={!option.props.disabled && (() => this.handleOptionClick(option.props))}
                  >
                    {option.props.children}
                  </Option>
                ))
              }
            </OptionBox>

          </Options>
        </SelectionWrapper>
      </Wrapper>
    );
  }
}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

export default Dropdown;
