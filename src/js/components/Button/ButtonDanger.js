import React from 'react';
import Button from './Button';
import color from '../Color';

const ButtonDanger = props => (
  <Button
    {...props}
    bgColor={color.red}
    bgColorHover="#db6060"
    bgColorActive="#b75b5b"
    bgColorDisabled="#ebf0f5"
    labelColor={color.pureWhite}
    labelColorHover={color.pureWhite}
    labelColorDisabled={color.black}
  />
);

export default ButtonDanger;
