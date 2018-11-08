import React from 'react';
import Button from './Button';
import color from '../Color';
import fontWeight from '../../../font-weight.ts';

const ButtonPrimary = props => (
  <Button
    bgColor={color.primary}
    bgColorHover={color.darkSkyBlue}
    bgColorActive={color.darkSkyBlue}
    bgColorDisabled={color.babyBlue}
    labelTextWeight={fontWeight.bold}
    labelColor={color.pureWhite}
    labelColorHover={color.pureWhite}
    labelColorDisabled={color.pureWhite}
    {...props}
  />
);

export default ButtonPrimary;
