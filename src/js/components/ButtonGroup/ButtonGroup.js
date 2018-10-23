import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../Color';

const propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    labelText: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
  })),
  onChange: PropTypes.func,
};

const defaultProps = {
  buttons: [],
  onChange: () => {},
};

const Button = styled.button`
  display: inline-block;
  height: 40px;
  padding: 8px 16px;
  border: solid 1px #c0c0c0;
  border-right: none;
  background-color: ${({ isActive }) => (isActive ? '#e6e6e6' : color.pureWhite)};
  transition: background-color 0.3s;
  font-size: 14px;
  color: ${color.black};
  font-weight: 300;
  min-width: 96px;
  cursor: pointer;

  &:hover, &:focus {
    background-color: #f3f3f3;
  }

  &:active {
    background-color: #e6e6e6;
  }

  &:first-of-type {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-of-type {
    border-right: solid 1px #c0c0c0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

class ButtonGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  handleButtonClick(idx) {
    return () => {
      this.props.onChange(idx);
    };
  }
  render() {
    const { buttons } = this.props;

    return (
      <div>
        {
          buttons.map((button, idx) =>
            (
              <Button
                isActive={button.isActive}
                key={button.labelText}
                onClick={this.handleButtonClick(idx)}
              >
                {button.labelText}
              </Button>
            ))
        }
      </div>
    );
  }
}

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default ButtonGroup;
