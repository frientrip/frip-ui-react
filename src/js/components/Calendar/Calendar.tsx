import moment from 'moment';
import React from 'react';
import BigCalendar, { stringOrDate } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import '../../../css/Calendar.css';
import Toolbar from './Toolbar';

/**
 * Big Calendar 이벤트 interface
 * @types에 object라고 정의되어 있어 직접 정의...
 *
 * @interface CaledarEvent
 */
export interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
  payload?: any;
}

/**
 * Big Calendar 날짜 슬롯 선택 했을 때 사용하는 inteface
 * @types에 정의가 안되어 직접 정의....
 *
 * @interface CalendarSlot
 */
export interface CalendarSlot {
  start: stringOrDate;
  end: stringOrDate;
  slots: Date[] | string[];
  action: 'select'|'click'|'doubleClick';
}

interface CalendarProps {
  currentDate: Date;
  events?: CalendarEvent[];
  onSelectDate?: (slotInfo: CalendarSlot) => any;
  onSelectEvent?: (event: CalendarEvent) => any;
  eventComponent?: React.SFC<{ event: CalendarEvent }>;
}

interface CalendarState {
  date: Date;
}

const Wrapper = styled.div`
  height: 100%;
  padding: 18px;
`;

const localizer = BigCalendar.momentLocalizer(moment);
const locale = 'ko';
moment.locale(locale);

const formats = {
  dateFormat: 'D',
  monthHeaderFormat: 'YYYY년 MM월',
};

const messages = {
  showMore: (num: number) => `+ ${num} ...`,
  today: '오늘',
};

class Calendar extends React.Component<CalendarProps, CalendarState> {
  constructor(props: CalendarProps) {
    super(props);
    this.state = {
      date: new Date(),
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSlotSelected = this.handleSlotSelected.bind(this);
    this.handleEventSelected = this.handleEventSelected.bind(this);
  }

  handleDateChange(date: Date) {
    this.setState({
      date,
    });
  }

  /**
   * 달력 날짜를 선택했을 때 작동하는 함수
   *
   * @private
   * @param {CalendarSlot} slotInfo
   * @memberof Calendar
   */
  private handleSlotSelected(slotInfo: CalendarSlot): void {
    if (this.props.onSelectDate) {
      this.props.onSelectDate(slotInfo);
    }
  }

  private handleEventSelected(event: CalendarEvent) {
    if (this.props.onSelectEvent) {
      this.props.onSelectEvent(event);
    }
  }

  render() {
    const {
      currentDate,
      events,
      eventComponent,
    } = this.props;

    const components = {
      event: eventComponent && ((props: any) => {
        const EventComponent: any = eventComponent;
        return (
          <EventComponent {...props} />
        );
      }),
    };

    return (
      <Wrapper>
        <BigCalendar
          localizer={localizer}
          toolbar={false}
          date={currentDate}
          onNavigate={() => {}}
          events={events}
          formats={formats}
          messages={messages}
          components={components}
          selectable
          onSelectSlot={this.handleSlotSelected}
          onSelectEvent={this.handleEventSelected}
        />
      </Wrapper>
    );
  }
}

export default Calendar;
