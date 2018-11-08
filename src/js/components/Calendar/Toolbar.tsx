import * as React from 'react';
import styled from 'styled-components';
import rightArrow from '../../assets/svgs/small-next.svg';
import leftArrow from '../../assets/svgs/small-prev.svg';
import { ButtonGhost, ButtonPrimary } from '../Button';

interface ToolbarProps {
  todayLabel: string;
  monthLabel: string;
  primaryButtonLabel?: string;
  onClickPrimaryButton?: () => any;
  onClickToday?: () => any;
  onClickPrevMonth?: () => any;
  onClickNextMonth?: () => any;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

const MonthHeaderWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const MonthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MonthMoveButton = styled.div`
  width: 24px;
  height: 24px;
  color: #4a4a4a;

  svg {
    stroke: currentColor;
  }
`;

const Month = styled.div`
  margin: 0 18px;
`;

export default class Toolbar extends React.Component<ToolbarProps> {

  public render() {
    const { todayLabel, monthLabel, primaryButtonLabel, onClickPrimaryButton, onClickToday, onClickPrevMonth, onClickNextMonth } = this.props;
    return (
      <Wrapper>
        <ButtonGhost
          small
          labelText={todayLabel}
          labelColor="#4a4a4a"
          labelColorHover="#4a4a4a"
          onClick={onClickToday}
        />
        <MonthHeaderWrapper>
          <MonthHeader>
            <MonthMoveButton dangerouslySetInnerHTML={{ __html: leftArrow }} onClick={onClickPrevMonth} />
            <Month>
              {monthLabel}
            </Month>
            <MonthMoveButton dangerouslySetInnerHTML={{ __html: rightArrow }} onClick={onClickNextMonth}/>
          </MonthHeader>
        </MonthHeaderWrapper>
        {
          primaryButtonLabel &&
          <ButtonPrimary small labelText={primaryButtonLabel} onClick={onClickPrimaryButton} />
        }
      </Wrapper>
    );
  }
}
