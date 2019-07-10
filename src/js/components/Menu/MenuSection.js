import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../Color';
import ChevronIcon from '../../assets/svgs/ic-chevron-down-grey.svg';

import MenuItem from './MenuItem';
import fontWeight from '../../../font-weight';

const propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
  isMobile: PropTypes.bool,
};

const defaultProps = {
  icon: null,
  children: null,
  onClick: () => {},
  isMobile: false,
};

const Section = styled.div`
  position: relative;
  display: block;
  width: 100%;
  margin: 0;
  color: ${color.black};
  font-weight: ${fontWeight.normal};
  border-top: 1px solid ${color.silver};

  &:first-of-type {
    border: none;
  }
`;

const IconWrapper = styled.div`
  ${({ isMobile }) => (isMobile ? 'position: absolute; top:8px;left:16px;' : '')}
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: ${({ isMobile }) => (isMobile ? '16px' : '8px')};
  overflow: hidden;
  z-index: 2;
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
    background-color: ${color.veryLightBlue};
  }
`;

const Label = styled.div`
  display: inline-block;
  font-size: 18px;
  vertical-align: 5px;
  user-select: none;
`;

const MenuUl = styled.ul`
  display: block;
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
  ${({ isMobile }) => (isMobile ? 'padding-left: 48px;' : '')}
  height: ${({ isOpen, numItems }) => (isOpen ? `${numItems * 40}px` : '0')};
  transform-origin: left top;
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0) scale(1,1)' : 'translateY(-5px) scale(1,0)')};
  transition: height 0.2s ease-in-out, transform 0.2s ease-in-out;

  >li {
    ${({ isMobile }) => (isMobile ? 'padding-left: 8px;' : '')}
  }
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
    this.props.onClick();
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
        {
          this.props.isMobile
          ? icon &&
            <IconWrapper
              isMobile={this.props.isMobile}
              dangerouslySetInnerHTML={{ __html: icon }}
            />
          :
          <SectionLabelWrapper
            onClick={this.handleButtonClick}
          >
            {
              icon && <IconWrapper dangerouslySetInnerHTML={{ __html: icon }} />
            }
            <Label>{label}</Label>
            {
              !!filteredChildren.length &&
              <ChevronWrapper
                dangerouslySetInnerHTML={{ __html: ChevronIcon }}
                down={this.state.isOpen}
              />
            }
          </SectionLabelWrapper>
        }
        {
          !!filteredChildren.length &&
          <MenuUl
            isMobile={this.props.isMobile}
            isOpen={this.state.isOpen || this.props.isMobile}
            numItems={filteredChildren.length}
          >
            {filteredChildren}
          </MenuUl>
        }
      </Section>
    );
  }
}

MenuSection.propTypes = propTypes;
MenuSection.defaultProps = defaultProps;

export default MenuSection;
