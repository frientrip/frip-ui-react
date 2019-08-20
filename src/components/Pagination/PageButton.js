import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Color from '../Color';
import leftArrow from '../../assets/svgs/small-prev.svg';
import rightArrow from '../../assets/svgs/small-next.svg';

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
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  margin: 4px;
  user-select: none;
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};

  &:hover,
  &:focus {
    background-color: ${({ disabled }) => (disabled ? 'white' : Color.veryLightBlue)};
  }
`;

const IconWrapper = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;

  color: ${({ disabled }) => (disabled ? '#e6e6e6' : '#4a4a4a')};

  svg {
    stroke: currentColor;
  }
`;

const PageButton = ({ label, isSelected, disabled, onClick, icon }) => (
  <Wrapper>
    <Button onClick={onClick} isSelected={isSelected} disabled={disabled}>
      {icon
        ? <IconWrapper disabled={disabled} dangerouslySetInnerHTML={{ __html: icon }} />
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
