import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  onClick: PropTypes.func,
};

const defaultProps = {
  onClick: () => {},
};

const Wrapper = styled.div`
  background-color: red;
  padding: 10px;
`;

const Button = ({ onClick }) =>
  (
    <Wrapper>
      <button onClick={onClick}>Just a button</button>
    </Wrapper>
  );

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
