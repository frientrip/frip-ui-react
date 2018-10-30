import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const Wrapper = styled.div`
  flex: 1 1 auto;
  width: 100%;
`;

const Tab = ({ label, children }) => (
  <Wrapper label={label}>
    {children}
  </Wrapper>
);

Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;
Tab.displayName = 'Frip.UI.Tab';

export default Tab;
