import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Color from '../Color';
import leftArrow from '../../assets/svgs/small-prev-black.svg';
import rightArrow from '../../assets/svgs/small-next-black.svg';

const propTypes = {
  label: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
};

const defaultProps = {
  label: null,
  isSelected: false,
  onClick: () => {},
  disabled: false,
  icon: null,
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.div`
  width: 32px;
  height: 32px;
  line-height: 24px;
  font-size: 14px;
  padding: 4px 0;
  color: ${Color.black};
  background-color: white;
  text-align: center;
  cursor: pointer;
  margin: 4px;
  user-select: none;
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};

  &:hover,
  &:focus {
    background-color: ${Color.veryLightBlue};
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

const IconWrapper = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
`;

const PageButton = ({ label, isSelected, disabled, onClick, icon }) => (
  <Wrapper>
    {disabled && <Blocker />}
    <Button onClick={onClick} isSelected={isSelected}>
      {icon
        ? <IconWrapper dangerouslySetInnerHTML={{ __html: icon }} />
        : label}
    </Button>
  </Wrapper>
);

PageButton.propTypes = propTypes;
PageButton.defaultProps = defaultProps;

const PrevButton = props =>
  <PageButton {...props} icon={leftArrow} />;

const NextButton = props =>
  <PageButton {...props} icon={rightArrow} />;

export {
  PageButton,
  PrevButton,
  NextButton,
};
