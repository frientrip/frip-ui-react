import * as React from 'react';
import { Messages, Navigate } from 'react-big-calendar';
import styled from 'styled-components';
import rightArrow from '../../assets/svgs/small-next.svg';
import leftArrow from '../../assets/svgs/small-prev.svg';
import { ButtonGhost, ButtonPrimary } from '../Button';

/**
 * @types/react-big-calendar에 BigCalendar가 받는
 * toolbar component의 propType이 정의되어있지 않습니다.
 * 그래서 인터페이스를 직접 작성하고 optional 처리를 했습니다.
 *
 * @interface ToolbarProps
 */
interface ToolbarProps {
  date?: Date;
  label?: string; // 상단 가운데 표시되는 연도, 달
  onNavigate?: (action: Navigate, newDate: Date) => any;
  messages?: Messages;

  primaryButtonLabel?: string;
  onClickPrimaryButton?: () => any;
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

export default class ExtendedToolbar extends React.Component<ToolbarProps> {
  constructor(props: ToolbarProps) {
    super(props);

    this.onClickToday = this.onClickToday.bind(this);
    this.onClickNextMonth = this.onClickNextMonth.bind(this);
    this.onClickPrevMonth = this.onClickPrevMonth.bind(this);
  }
  private onClickToday() {
    this.props.onNavigate!('TODAY', this.props.date!);
  }

  private onClickPrevMonth() {
    this.props.onNavigate!('PREV', this.props.date!);
    console.log();
  }

  private onClickNextMonth() {
    this.props.onNavigate!('NEXT', this.props.date!);
  }

  public render() {
    const { messages, label, primaryButtonLabel, onClickPrimaryButton } = this.props;
    return (
      <Wrapper>
        <ButtonGhost small labelText={messages!.today} labelColor="#4a4a4a" labelColorHover="#4a4a4a" onClick={this.onClickToday} />
        <MonthHeaderWrapper>
          <MonthHeader>
            <MonthMoveButton dangerouslySetInnerHTML={{ __html: leftArrow }} onClick={this.onClickPrevMonth} />
            <Month>
              {label}
            </Month>
            <MonthMoveButton dangerouslySetInnerHTML={{ __html: rightArrow }} onClick={this.onClickNextMonth}/>
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
