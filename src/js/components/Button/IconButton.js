import React from 'react';
import ButtonGhost from './ButtonGhost';

const IconButton = props => (
  <ButtonGhost
    {...props}
    borderColor="#9b9b9b"
    labelText=""
    iconPosition="center"
  />
);

export default IconButton;
