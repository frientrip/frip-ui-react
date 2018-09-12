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
};

const defaultProps = {
  activeIndex: 0,
  big: false,
  children: null,
  onChange: () => {},
  className: '',
};

const TabLabel = styled.div`
  display: inline-block;
  font-size: ${({ big }) => (big ? '18px' : '14px')};
  padding: 12px 16px;
  color: ${({ isActive }) => (isActive ? color.primary : color.grey)};
  border-color: ${color.primary};
  border-bottom: ${({ isActive }) => (isActive ? '1px solid' : 'none')};
  font-weight: 400;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ isActive }) => (isActive ? color.primary : color.black)};
  }
`;

const TabLabels = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  margin-bottom: 10px;
`;

const TabContent = styled.div`
`;

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
    };
    this.handleTabClick = this.handleTabClick.bind(this);
  }
  handleTabClick(index) {
    this.setState({
      activeIndex: index,
    });

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
      <div className={this.props.className}>
        <TabLabels>
          {
            tabLabels.map((label, index) =>
              (
                <TabLabel
                  key={label}
                  big={big}
                  onClick={() => this.handleTabClick(index)}
                  isActive={this.state.activeIndex === index}
                >
                  {label}
                </TabLabel>
              ))
          }
        </TabLabels>
        <TabContent>
          {
            filteredChildren[this.state.activeIndex]
          }
        </TabContent>
      </div>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export default Tabs;
