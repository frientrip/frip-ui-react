import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import color from '../Color';

const propTypes = {
  labelText: PropTypes.string.isRequired,
  labelTextWeight: PropTypes.number,
  labelColor: PropTypes.string,
  labelColorDisabled: PropTypes.string,
  bgColor: PropTypes.string,
  bgColorHover: PropTypes.string,
  bgColorActive: PropTypes.string,
  bgColorDisabled: PropTypes.string,
  borderColor: PropTypes.string,
  borderColorDisabled: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

const defaultProps = {
  onClick: () => {},
  disabled: false,
  labelTextWeight: 300,
  labelColor: color.black,
  labelColorDisabled: '#4a4a4a',
  bgColor: color.lightSilver,
  bgColorHover: '#dbe0e4',
  bgColorActive: '#cbcfd3',
  bgColorDisabled: '#f5f8fa',
  borderColor: '',
  borderColorDisabled: '',
};

const disabledCss = css`
  user-select: none;
  ${({ borderColorDisabled }) => (borderColorDisabled ? `border: 1px solid ${borderColorDisabled};` : '')}
`;

const enabledCss = css`
  ${({ borderColor }) => (borderColor ? `border: 1px solid ${borderColor};` : '')}
  
  ${({ bgColorHover, bgColorActive }) => `
    &:hover {
      background-color: ${bgColorHover};
    };

    &:active {
      background-color: ${bgColorActive};
    };
  `}
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: inline-block;
  background-color: ${({ disabled, bgColor, bgColorDisabled }) => (disabled ? bgColorDisabled : bgColor)};
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  transition: background-color 0.3s;

  ${props => (props.disabled ? disabledCss : enabledCss)}
`;

const Label = styled.div`
  font-size: 14px;
  text-align: center;
  font-weight: ${({ labelTextWeight }) => labelTextWeight};
  color: ${({ disabled, labelColor, labelColorDisabled }) => (disabled ? labelColorDisabled : labelColor)};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
`;

const Button = ({
  onClick, disabled,
  labelText, labelTextWeight, labelColor, labelColorDisabled,
  bgColor, bgColorHover, bgColorActive, bgColorDisabled,
  borderColor, borderColorDisabled,
}) =>
  (
    <Wrapper
      onClick={disabled ? () => {} : onClick}
      disabled={disabled}
      bgColor={bgColor}
      bgColorHover={bgColorHover}
      bgColorActive={bgColorActive}
      bgColorDisabled={bgColorDisabled}
      borderColor={borderColor}
      borderColorDisabled={borderColorDisabled}
    >
      <Label
        disabled={disabled}
        labelTextWeight={labelTextWeight}
        labelColor={labelColor}
        labelColorDisabled={labelColorDisabled}
      >
        {labelText}
      </Label>
    </Wrapper>
  );

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;

const ButtonPrimary = props =>
  (
    <Button
      {...props}
      bgColor={color.primary}
      bgColorHover="#3591ed"
      bgColorActive="#3789db"
      bgColorDisabled="#99ccff"
      labelTextWeight={500}
      labelColor={color.white}
      labelColorDisabled={color.white}
    />
  );

const ButtonDanger = props =>
  (
    <Button
      {...props}
      bgColor={color.red}
      bgColorHover="#ed6363"
      bgColorActive="#db6060"
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
      bgColorHover="#fcfcfd"
      bgColorActive="#f8f9fb"
      bgColorDisabled={color.white}
      labelColor={color.grey}
      labelColorDisabled={color.grey}
      borderColor="#d9e0e8"
      borderColorDisabled="rgba(217, 224, 232, 0.5)"
    />
  );

export {
  ButtonPrimary,
  ButtonDanger,
  ButtonGhost,
};
