import React from 'react';
import color from '../Color';
import Button from './Button';

const ButtonGhostPrimary = props => (
  <Button
    bgColor={color.pureWhite}
    bgColorHover={color.pureWhite}
    bgColorActive={color.pureWhite}
    bgColorDisabled={color.pureWhite}
    labelColor={color.primary}
    labelColorHover={color.darkSkyBlue}
    labelColorDisabled={color.babyBlue}
    borderColor={color.primary}
    borderColorHover={color.darkSkyBlue}
    borderColorActive={color.darkSkyBlue}
    borderColorDisabled={color.babyBlue}
    {...props}
  />
);

export default ButtonGhostPrimary;
