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

const TabContent = styled.div`
`;

const Tab = ({ label, children }) => (
  <TabContent label={label}>
    {children}
  </TabContent>
);

Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;
Tab.displayName = 'Frip.UI.Tab';

export default Tab;
