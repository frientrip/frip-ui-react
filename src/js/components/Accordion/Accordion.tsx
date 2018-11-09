import React from 'react';
import styled from 'styled-components';
import color from '../Color';
import fontWeight from '../../../font-weight';
import ChevronIcon from '../../assets/svgs/ic-chevron-down-black.svg';

const Section = styled.div`
  position: relative;
  display: block;
  width: 100%;
  margin: 0;
  color: ${color.black};
  font-weight: ${fontWeight.normal};
  border-top: 1px solid ${color.white};
  font-family: 'Spoqa Han Sans', sans-serif;

  &:last-of-type {
    border-bottom: 1px solid ${color.white};
  }
`;

const ChevronWrapper = styled.div<{ up?: boolean }>`
  display: inline-block;
  position: absolute;
  width: 24px;
  height: 24px;
  top: 16px;
  right: 16px;
  cursor: pointer;
  opacity: 1;
  transform: ${({ up }) => (up ? 'rotate(180deg)' : 'rotate(0)')};
  transition: opacity 0.2s, transform 0.5s;

  &:hover {
    opacity: 0.3;
  }
`;

const SectionLabelWrapper = styled.div`
  position: relative;
  padding: 20px 0;
  width: 100%;
  line-height: 22px;
  background-color: white;
  transition: background-color 0.4s;
  cursor: pointer;

  &:hover {
    background-color: ${color.veryLightBlue};
  }
`;

const Label = styled.div`
  display: inline-block;
  font-size: 20px;
  user-select: none;
`;

const Content = styled.div<{ isOpen: boolean }>`
  display: block;
  overflow: hidden;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  max-height: ${({ isOpen }) => (isOpen ? '2000px' : '0')};
  transform-origin: left top;
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0) scale(1,1)' : 'translateY(-2px) scale(1,0)')};
  transition: height 0.2s ease-in-out, transform 0.2s ease-in-out;
`;

interface AccordionSectionProps {
  content: React.ComponentType;
  sectionLabel: string;
}

interface AccordionSectionState {
  isOpen: boolean;
}

class AccordionSection extends React.Component<AccordionSectionProps, AccordionSectionState> {
  constructor(props: AccordionSectionProps) {
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
      sectionLabel,
      content,
    } = this.props;

    return (
      <Section>
        <SectionLabelWrapper
          onClick={this.handleButtonClick}
        >
          <Label>{sectionLabel}</Label>
            <ChevronWrapper
              dangerouslySetInnerHTML={{ __html: ChevronIcon }}
              up={this.state.isOpen}
            />
        </SectionLabelWrapper>
        <Content
          isOpen={this.state.isOpen}
        >
          {content}
        </Content>
      </Section>
    );
  }
}

interface AccordionProps {
  contents: React.ComponentType[];
  sectionLabels: string[];
}

class Accordion extends React.Component<AccordionProps> {
  render() {
    const {
      sectionLabels,
      contents,
    } = this.props;

    return (
      <div>
        {
          contents.map((content, idx) => <AccordionSection key={sectionLabels[idx]} content={content} sectionLabel={sectionLabels[idx]} />)
        }
      </div>
    );
  }
}

export default Accordion;
