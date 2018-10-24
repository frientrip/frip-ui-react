import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../Color';

const propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  isMobile: PropTypes.bool,
  badge: PropTypes.string,
};

const defaultProps = {
  isSelected: false,
  isMobile: false,
  onClick: () => {},
  badge: '',
};

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  margin: 0;
  padding: 8px 20px 8px ${({ isMobile }) => (isMobile ? '56px' : '48px')};
  line-height: 24px;
  list-style-type: none;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#f5faff' : color.pureWhite)};
  color: ${({ isSelected }) => (isSelected ? color.primary : color.black)};
  user-select: none;

  &:hover {
    background-color: ${color.veryLightBlue};
  }
`;
const Badge = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  line-height: 16px;
  font-size: 10px;
  color: white;
  text-align: center;
  background-color: ${color.primary};
  overflow: hidden;
`;

const MenuItem = ({
 label, isSelected, onClick, isMobile, badge 
}) => (
  <ListItem isMobile={isMobile} isSelected={isSelected} onClick={onClick}>
    {label}
    {
      badge && <Badge>{badge}</Badge>
    }
  </ListItem>
);

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;
MenuItem.displayName = 'Frip.UI.MenuItem';

export default MenuItem;
