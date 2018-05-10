import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Color from '../Color';

const propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

const defaultProps = {
  isSelected: false,
  onClick: () => {},
  disabled: false,
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.div`
  background-color: ${({ isSelected }) => (isSelected ? 'rgba(192, 192, 192, 0.4)' : Color.white)};
  width: 32px;
  height: 32px;
  border-radius: 4px;
  font-size: 14px;
  padding: 4px 0;
  color: ${Color.black};
  text-align: center;
  border: 1px solid ${Color.lightGrey};
  cursor: pointer;
  margin: 4px;
  user-select: none;

  &:hover,
  &:focus {
    background-color: rgba(51, 153, 255, 0.2);
    border-color: ${Color.primary}
  }
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

const PageButton = ({ label, isSelected, disabled, onClick }) => (
  <Wrapper>
    {disabled && <Blocker />}
    <Button onClick={onClick} isSelected={isSelected}>
      {label}
    </Button>
  </Wrapper>
);

PageButton.propTypes = propTypes;
PageButton.defaultProps = defaultProps;

const PrevButton = props =>
  <PageButton {...props} label="《" />;

const NextButton = props =>
  <PageButton {...props} label="》" />;

export {
  PageButton,
  PrevButton,
  NextButton,
};
