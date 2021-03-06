import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../Color';

import Tab from './Tab';

const propTypes = {
  activeIndex: PropTypes.number,
  big: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func,
  className: PropTypes.string,
  justified: PropTypes.bool,
};

const defaultProps = {
  activeIndex: 0,
  big: false,
  children: null,
  onChange: () => {},
  className: '',
  justified: false,
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
`;

const TabLabel = styled.div`
  ${({ justified }) => (justified ? 'flex-basis: 100%;' : 'min-width: 120px')}
  display: inline-block;
  font-size: ${({ big }) => (big ? '18px' : '14px')};
  padding: 12px 16px;
  color: ${({ isActive }) => (isActive ? color.primary : color.grey)};
  border-color: ${color.primary};
  border-bottom: ${({ isActive }) => (isActive ? '1px solid' : 'none')};
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ isActive }) => (isActive ? color.primary : color.black)};
  }
`;

const TabLabels = styled.div`
  flex: 0 0 auto;
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  margin-bottom: 10px;
`;

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.handleTabClick = this.handleTabClick.bind(this);
  }
  handleTabClick(index) {
    this.props.onChange(index);
  }
  render() {
    const {
      big,
      children,
    } = this.props;

    const filteredChildren = React.Children.toArray(children)
      .filter(node => node.type && node.type.displayName === Tab.displayName);

    const tabLabels = filteredChildren.map(({ props: { label } }) => label);

    return (
      <Wrapper className={this.props.className}>
        <TabLabels>
          {
            tabLabels.map((label, index) =>
              (
                <TabLabel
                  key={label}
                  justified={this.props.justified}
                  big={big}
                  onClick={() => this.handleTabClick(index)}
                  isActive={this.props.activeIndex === index}
                >
                  {label}
                </TabLabel>
              ))
          }
        </TabLabels>
        {
          filteredChildren[this.props.activeIndex]
        }
      </Wrapper>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export default Tabs;
