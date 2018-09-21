import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../Color';

const propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  isMobile: PropTypes.bool,
};

const defaultProps = {
  isSelected: false,
  isMobile: false,
  onClick: () => {},
};

const ListItem = styled.li`
  width: 100%;
  height: 40px;
  margin: 0;
  padding: 8px 8px 8px ${({ isMobile }) => (isMobile ? '56px' : '48px')};
  line-height: 24px;
  text-align: left;
  list-style-type: none;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#f5faff' : color.white)};
  color: ${({ isSelected }) => (isSelected ? color.primary : color.black)};
  user-select: none;

  &:hover {
    background-color: #f5faff;
  }
`;

const MenuItem = ({ label, isSelected, onClick, isMobile }) => (
  <ListItem isMobile={isMobile} isSelected={isSelected} onClick={onClick}>{label}</ListItem>
);

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;
MenuItem.displayName = 'Frip.UI.MenuItem';

export default MenuItem;
