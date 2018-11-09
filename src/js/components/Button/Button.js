import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import color from '../Color';

import Spinner from '../Spinner';
import fontWeight from '../../../font-weight';

const propTypes = {
  className: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  labelTextWeight: PropTypes.number,
  labelColor: PropTypes.string,
  labelColorHover: PropTypes.string,
  labelColorDisabled: PropTypes.string,
  bgColor: PropTypes.string,
  bgColorHover: PropTypes.string,
  bgColorActive: PropTypes.string,
  bgColorDisabled: PropTypes.string,
  borderColor: PropTypes.string,
  borderColorHover: PropTypes.string,
  borderColorActive: PropTypes.string,
  borderColorDisabled: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  fluid: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.string,
  tabIndex: PropTypes.number,
};

const defaultProps = {
  className: '',
  onClick: () => {},
  disabled: false,
  labelTextWeight: fontWeight.normal,
  labelColor: color.black,
  labelColorHover: color.black,
  labelColorDisabled: color.silver,
  bgColor: color.paleGrey,
  bgColorHover: color.lightBlueGrey,
  bgColorActive: color.lightBlueGrey,
  bgColorDisabled: color.paleGrey2,
  borderColor: '',
  borderColorHover: '',
  borderColorActive: '',
  borderColorDisabled: '',
  isLoading: false,
  large: false,
  small: false,
  fluid: false,
  icon: null,
  iconPosition: 'left',
  tabIndex: 0,
};

const disabledCss = css`
  user-select: none;
  color: ${({ labelColorDisabled }) => labelColorDisabled};
  border: 1px solid ${({ borderColorDisabled, bgColorDisabled }) => (borderColorDisabled || bgColorDisabled)};
`;

const enabledCss = css`
  color: ${({ labelColor }) => labelColor};
  border: 1px solid ${({ borderColor, bgColor }) => (borderColor || bgColor)};

  ${({
    bgColorHover, bgColorActive, borderColorHover, borderColorActive, labelColorHover,
  }) => `
    &:hover, &:focus {
      border-color: ${borderColorHover || bgColorHover};
      background-color: ${bgColorHover};
    };

    &:active {
      border-color: ${borderColorActive || bgColorActive};
      background-color: ${bgColorActive};
    };

    &:hover, &:active {
      color: ${labelColorHover};
    }
  `}
  cursor: pointer;
`;

const Wrapper = styled.button`
  border: none;
  position: relative;
  display: ${({ fluid }) => (fluid ? 'block' : 'inline-block')};
  ${({ fluid }) => (fluid ? 'width: 100%;' : '')}
  background-color: ${({ disabled, bgColor, bgColorDisabled }) => (disabled ? bgColorDisabled : bgColor)};
  border-radius: 4px;
  height: ${({ small, large }) => (small ? '35px' : large ? '50px' : '40px')};
  line-height: ${({ small, large, isIcon }) => (small ? '13px' : (large || isIcon) ? '24px' : '14px')};
  padding: ${({ small, isIcon }) => (isIcon ? '7px 15px' : (small ? '10px 18px' : '12px 18px'))};
  transition: background-color 0.3s;
  text-align: center;
  font-family: 'Spoqa Han Sans', sans-serif;

  ${props => (props.disabled ? disabledCss : enabledCss)}
`;

const Label = styled.div`
  display: inline-block;
  vertical-align: ${({ vAlign }) => vAlign};
  height: 100%;
  line-height: inherit;
  font-size: ${({ fontSize }) => fontSize}px;
  text-align: center;
  font-weight: ${({ labelTextWeight }) => labelTextWeight};
  color: inherit;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  opacity: ${({ isLoading }) => (isLoading ? 0 : '')};
  user-select: none;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  text-align: center;
`;

const IconWrapper = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  overflow: hidden;
  vertical-align: middle;
`;

const LeftIconWrapper = styled(IconWrapper)`
  margin-right: 8px;
`;

const CenterIconWrapper = styled(IconWrapper)`
`;

const RightIconWrapper = styled(IconWrapper)`
  margin-left: 8px;
`;

const Button = ({
  className,
  onClick, disabled,
  labelText, labelTextWeight, labelColor, labelColorHover, labelColorDisabled,
  bgColor, bgColorHover, bgColorActive, bgColorDisabled,
  borderColor, borderColorHover, borderColorActive, borderColorDisabled,
  isLoading,
  large,
  small,
  fluid,
  icon,
  iconPosition,
  tabIndex,
}) =>
  (
    <Wrapper
      className={className}
      tabIndex={tabIndex !== undefined ? tabIndex : !disabled }
      onClick={disabled || isLoading ? () => {} : onClick}
      disabled={disabled || isLoading}
      bgColor={bgColor}
      bgColorHover={bgColorHover}
      bgColorActive={bgColorActive}
      bgColorDisabled={bgColorDisabled}
      labelColor={labelColor}
      labelColorHover={labelColorHover}
      labelColorDisabled={labelColorDisabled}
      borderColor={borderColor}
      borderColorHover={borderColorHover}
      borderColorActive={borderColorActive}
      borderColorDisabled={borderColorDisabled}
      fluid={fluid}
      small={small}
      large={large}
      isIcon={icon !== undefined && icon !== null}
    >
      {
        icon && iconPosition === 'left' &&
        <LeftIconWrapper dangerouslySetInnerHTML={{ __html: icon }} />
      }
      {
        icon && iconPosition === 'center' &&
        <CenterIconWrapper dangerouslySetInnerHTML={{ __html: icon }} />
      }
      {
        labelText &&
        <Label
          disabled={disabled}
          labelTextWeight={labelTextWeight}
          isLoading={isLoading}
          fontSize={large ? 17 : small ? 13 : 14}
          vAlign={large ? '2px' : '0px'}
        >
          {labelText}
        </Label>
      }
      {
        icon && iconPosition === 'right' &&
        <RightIconWrapper dangerouslySetInnerHTML={{ __html: icon }} />
      }
      {
        isLoading &&
        <SpinnerWrapper>
          <Spinner size={large ? 64 : 40} />
        </SpinnerWrapper>
      }
    </Wrapper>
  );

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
