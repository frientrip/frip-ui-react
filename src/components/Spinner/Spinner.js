import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import color from '../Color';

const propTypes = {
  size: PropTypes.number,
};

const defaultProps = {
  size: 50,
};

const AnimationFade = keyframes`
  from {opacity: 1;}
  to {opacity: 0.25;}
`;

const Wrapper = styled.div`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: inline-block;

  & > div {
    width: ${({ size }) => (size > 50 ? '3%' : '2px')};
  }

  & .leaf1 {
    transform:rotate(0deg) translate(0, -130%);
    animation-delay: 0s;
  }    

  & .leaf2 {
    transform:rotate(30deg) translate(0, -130%); 
    animation-delay: -0.9167s;
  }

  & .leaf3 {
    transform:rotate(60deg) translate(0, -130%); 
    animation-delay: -0.833s;
  }
  & .leaf4 {
    transform:rotate(90deg) translate(0, -130%); 
    animation-delay: -0.7497s;
  }
  & .leaf5 {
    transform:rotate(120deg) translate(0, -130%); 
    animation-delay: -0.667s;
  }
  & .leaf6 {
    transform:rotate(150deg) translate(0, -130%); 
    animation-delay: -0.5837s;
  }
  & .leaf7 {
    transform:rotate(180deg) translate(0, -130%); 
    animation-delay: -0.5s;
  }
  & .leaf8 {
    transform:rotate(210deg) translate(0, -130%); 
    animation-delay: -0.4167s;
  }
  & .leaf9 {
    transform:rotate(240deg) translate(0, -130%); 
    animation-delay: -0.333s;
  }
  & .leaf10 {
    transform:rotate(270deg) translate(0, -130%); 
    animation-delay: -0.2497s;
  }
  & .leaf11 {
    transform:rotate(300deg) translate(0, -130%); 
    animation-delay: -0.167s;
  }
  & .leaf12 {
    transform:rotate(330deg) translate(0, -130%); 
    animation-delay: -0.0833s;
  }
`;

const Leaf = styled.div`
  height: 18%;
  background: ${color.grey};
  position: absolute;
  left: 49%;
  top: 43%;
  opacity: 0;
  border-radius: 10px;
  animation: ${AnimationFade} 1s linear infinite;
`;

const Spinner = ({ size }) =>
  (
    <Wrapper size={size}>
      <Leaf className="leaf1" />
      <Leaf className="leaf2" />
      <Leaf className="leaf3" />
      <Leaf className="leaf4" />
      <Leaf className="leaf5" />
      <Leaf className="leaf6" />
      <Leaf className="leaf7" />
      <Leaf className="leaf8" />
      <Leaf className="leaf9" />
      <Leaf className="leaf10" />
      <Leaf className="leaf11" />
      <Leaf className="leaf12" />
    </Wrapper>
  );

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
