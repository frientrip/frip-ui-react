import React from 'react';
import ButtonGhost from './ButtonGhost';

const IconButton = props => (
  <ButtonGhost
    borderColor="#9b9b9b"
    labelText=""
    iconPosition="center"
    {...props}
  />
);

export default IconButton;
