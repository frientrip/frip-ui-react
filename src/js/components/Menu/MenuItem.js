import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const defaultProps = {
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

  &:hover {
    background-color: #f5faff;
  }
`;

const MenuItem = ({ label, onClick }) => (
  <ListItem onClick={onClick}>{label}</ListItem>
);

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;
MenuItem.displayName = 'Frip.UI.MenuItem';

export default MenuItem;
