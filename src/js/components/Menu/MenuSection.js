import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../Color';
import ChevronIcon from '../../assets/svgs/ic-chevron-down-black.svg';

import MenuItem from './MenuItem';

const propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

const defaultProps = {
  icon: null,
  children: null,
};

const Section = styled.div`
  display: block;
  width: 100%;
  margin: 0;
  color: ${color.black};
  font-weight: 400;
`;

const IconWrapper = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  overflow: hidden;
`;

const ChevronWrapper = styled.div`
  display: inline-block;
  position: absolute;
  width: 24px;
  height: 24px;
  top: 16px;
  right: 16px;
  cursor: pointer;
  opacity: 1;
  transform: ${({ down }) => (down ? 'rotate(0)' : 'rotate(90deg)')};
  transition: opacity 0.4s, transform 0.5s;

  &:hover {
    opacity: 0.3;
  }
`;

const SectionLabelWrapper = styled.div`
  position: relative;
  padding: 16px;
  width: 100%;
  height: 56px;
  background-color: white;
  transition: background-color 0.4s;
  cursor: pointer;

  &:hover {
    background-color: #f5faff;
  }
`;

const Label = styled.div`
  display: inline-block;
  font-size: 18px;
  vertical-align: 5px;
`;

const MenuUl = styled.ul`
  display: block;
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
  height: ${({ isOpen, numItems }) => (isOpen ? `${numItems * 40}px` : '0')};
  transition: height 0.4s ease-in-out;
`;

class MenuSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  handleButtonClick() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    const {
      icon,
      label,
      children,
    } = this.props;

    const filteredChildren = React.Children.toArray(children)
      .filter(node => node.type && node.type.displayName === MenuItem.displayName);

    return (
      <Section>
        <SectionLabelWrapper
          onClick={this.handleButtonClick}
        >
          {
            icon && <IconWrapper dangerouslySetInnerHTML={{ __html: icon }} />
          }
          <Label>{label}</Label>
          <ChevronWrapper
            dangerouslySetInnerHTML={{ __html: ChevronIcon }}
            down={this.state.isOpen}
          />
        </SectionLabelWrapper>
        <MenuUl isOpen={this.state.isOpen} numItems={filteredChildren.length}>
          {filteredChildren}
        </MenuUl>
      </Section>
    );
  }
}

MenuSection.propTypes = propTypes;
MenuSection.defaultProps = defaultProps;

export default MenuSection;
