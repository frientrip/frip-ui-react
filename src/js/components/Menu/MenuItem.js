import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../Color';

const propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  isSelected: false,
  onClick: () => {},
};

const ListItem = styled.li`
  width: 100%;
  height: 40px;
  margin: 0;
  padding: 8px 8px 8px 48px;
  font-weight: 300;
  text-align: left;
  list-style-type: none;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#f5faff' : color.white)};
  color: ${({ isSelected }) => (isSelected ? color.primary : color.black)};

  &:hover {
    background-color: #f5faff;
  }
`;

const MenuItem = ({ label, isSelected, onClick }) => (
  <ListItem isSelected={isSelected} onClick={onClick}>{label}</ListItem>
);

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;
MenuItem.displayName = 'Frip.UI.MenuItem';

export default MenuItem;
