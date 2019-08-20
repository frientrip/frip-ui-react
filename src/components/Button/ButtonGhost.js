import React from 'react';
import Button from './Button';
import color from '../Color';

// TODO: Hover 스타일이 없음
const ButtonGhost = props => (
  <Button
    bgColor={color.pureWhite}
    bgColorHover="#f3f3f3"
    bgColorActive={color.white}
    bgColorDisabled={color.pureWhite}
    labelColor={color.grey}
    labelColorHover={color.grey}
    labelColorDisabled={color.grey}
    borderColor={color.pinkishGrey}
    borderColorDisabled="rgba(217, 224, 232, 0.5)"
    {...props}
  />
);

export default ButtonGhost;
