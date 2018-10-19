import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import color from '../Color';

import Spinner from '../Spinner';

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
};

const defaultProps = {
  className: '',
  onClick: () => {},
  disabled: false,
  labelTextWeight: 'normal',
  labelColor: color.black,
  labelColorHover: '#ffffff',
  labelColorDisabled: '#4a4a4a',
  bgColor: color.paleGrey,
  bgColorHover: color.lightBlueGrey,
  bgColorActive: '#cbcfd3',
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
};

const disabledCss = css`
  user-select: none;
  color: ${({ labelColorDisabled }) => labelColorDisabled};
  ${({ borderColorDisabled }) => (borderColorDisabled ? `border: 1px solid ${borderColorDisabled};` : '')}
`;

const enabledCss = css`
  color: ${({ labelColor }) => labelColor};
  ${({ borderColor }) => (borderColor ? `border: 1px solid ${borderColor};` : '')}

  ${({ bgColorHover, bgColorActive, borderColorHover, borderColorActive, labelColorHover }) => `
    &:hover, &:focus {
      border-color: ${borderColorHover};
      background-color: ${bgColorHover};
    };

    &:active {
      border-color: ${borderColorActive};
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
  line-height: 100%;
  padding: ${({ small }) => (small ? '10px 18px' : '12px 18px')};
  transition: background-color 0.3s;
  text-align: center;

  ${props => (props.disabled ? disabledCss : enabledCss)}
`;

const Label = styled.div`
  display: inline-block;
  vertical-align: ${({ vAlign }) => vAlign};
  height: 100%;
  line-height: 100%;
  font-size: ${({ fontSize }) => fontSize}px;
  text-align: center;
  font-weight: ${({ labelTextWeight }) => labelTextWeight};
  color: inherit;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
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
}) =>
  (
    <Wrapper
      className={className}
      tabIndex={disabled ? undefined : '0'}
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
    >
      {
        icon && iconPosition === 'left' &&
        <LeftIconWrapper dangerouslySetInnerHTML={{ __html: icon }} />
      }
      {
        icon && iconPosition === 'center' &&
        <CenterIconWrapper dangerouslySetInnerHTML={{ __html: icon }} />
      }
      <Label
        disabled={disabled}
        labelTextWeight={labelTextWeight}
        isLoading={isLoading}
        fontSize={large ? 17 : small ? 13 : 14}
        vAlign={large ? '2px' : 'middle'}
      >
        {labelText}
      </Label>
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

const ButtonPrimary = props =>
  (
    <Button
      {...props}
      bgColor={color.primary}
      bgColorHover="#3789db"
      bgColorActive="#3c79b7"
      bgColorDisabled="#99ccff"
      labelTextWeight="bold"
      labelColor={color.white}
      labelColorDisabled={color.white}
    />
  );

const ButtonDanger = props =>
  (
    <Button
      {...props}
      bgColor={color.red}
      bgColorHover="#db6060"
      bgColorActive="#b75b5b"
      bgColorDisabled="#ebf0f5"
      labelTextWeight={500}
      labelColor={color.white}
      labelColorDisabled={color.black}
    />
  );

const ButtonGhost = props =>
  (
    <Button
      {...props}
      bgColor={color.white}
      bgColorHover="#f3f3f3"
      bgColorActive="#e6e6e6"
      bgColorDisabled={color.white}
      labelColor={color.grey}
      labelColorDisabled={color.grey}
      borderColor="#d9e0e8"
      borderColorDisabled="rgba(217, 224, 232, 0.5)"
    />
  );

const ButtonGhostPrimary = props =>
  (
    <Button
      {...props}
      bgColor={color.white}
      bgColorHover={color.white}
      bgColorActive={color.white}
      bgColorDisabled={color.white}
      labelColor={color.primary}
      labelColorHover={color.darySkyBlue}
      labelColorDisabled={color.babyBlue}
      borderColor={color.primary}
      borderColorHover={color.darySkyBlue}
      borderColorActive={color.darySkyBlue}
      borderColorDisabled={color.babyBlue}
    />
  );

const IconButton = props =>
  (
    <ButtonGhost
      {...props}
      labelText=""
      iconPosition="center"
    />
  );

export {
  Button,
  ButtonPrimary,
  ButtonDanger,
  ButtonGhost,
  ButtonGhostPrimary,
  IconButton,
};
