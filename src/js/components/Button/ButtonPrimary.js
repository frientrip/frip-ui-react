import React from 'react';
import Button from './Button';
import color from '../Color';
import fontWeight from '../../../font-weight';

const ButtonPrimary = props => (
  <Button
    {...props}
    bgColor={color.primary}
    bgColorHover={color.darkSkyBlue}
    bgColorActive={color.darkSkyBlue}
    bgColorDisabled={color.babyBlue}
    labelTextWeight={fontWeight.bold}
    labelColor={color.pureWhite}
    labelColorHover={color.pureWhite}
    labelColorDisabled={color.pureWhite}
  />
);

export default ButtonPrimary;
