import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../Color';
import ChevronIcon from '../../assets/svgs/ic-chevron-down-black.svg';

const propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
};

const defaultProps = {
  className: '',
  label: '',
  disabled: false,
  children: null,
  onChange: () => {},
  defaultValue: null,
};

const Wrapper = styled.div`
`;

const SelectionWrapper = styled.div`
  display: block;
  position: relative;
  margin: 0;
  width: 100%;
  height: 40px;
  border: 1px solid ${color.lightGrey};
  border-radius: 4px;
  color: ${color.black};
  font-size: 14px;
  vertical-align: 5px;
  cursor: pointer;
  transition: background-color 0.4s;
  background-color: ${({ active }) => (active ? color.lightGrey : color.white)};

  &:hover {
    background-color: ${({ active }) => (active ? color.lightGrey : '#f3f3f3')};
  }

  &:active {
    background-color: ${color.lightGrey};
  }
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
  padding: 8px 16px;
`;

const ChevronWrapper = styled.div`
  width: 16px;
  height: 16px;
  cursor: pointer;
  opacity: 1;
  transform: ${({ down }) => (down ? 'rotate(0)' : 'rotate(90deg)')};
  transform: ${({ up }) => (up ? 'rotate(180deg)' : '')};
  transition: opacity 0.4s, transform 0.5s;

  &:hover {
    opacity: 0.3;
  }
`;

const Options = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  width: 100%;
  background-color: ${color.white};
  border-radius: inherit;
  border: solid 1px #d9e0e8;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: transform 0.2s ease-in-out, opacity 0.2s;
  transform-origin: left top;
  transform: ${({ visible }) => (visible ? 'translateY(0) scale(1,1)' : 'translateY(-10px) scale(1,0)')};
  z-index: 99;
`;

const Option = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  border-radius: inherit;

  &:hover {
    background-color: #f5faff;
  }
`;

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      label: this.props.defaultValue || 'Dropdown',
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.updateLabel = this.updateLabel.bind(this);
  }
  handleButtonClick() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  handleOptionClick(selectedOption) {
    this.props.onChange(selectedOption.value);
    this.handleButtonClick();
    this.updateLabel(selectedOption.children);
  }
  updateLabel(value) {
    this.setState({
      label: value,
    });
  }
  render() {
    const {
      label,
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
            disabled={disabled}
            active={this.state.isOpen}
            onClick={disabled ? null : this.handleButtonClick}
          >
            <div>{this.state.label}</div>
            <ChevronWrapper
              dangerouslySetInnerHTML={{ __html: ChevronIcon }}
              down
              up={this.state.isOpen}
            />
          </SelectedOption>
          <Options
            visible={this.state.isOpen}
          >
            {filteredChildren.map(option => <Option key={option.props.value} onClick={() => this.handleOptionClick(option.props)}>{option}</Option>)}
          </Options>
        </SelectionWrapper>
      </Wrapper>
    );
  }
}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

export default Dropdown;
