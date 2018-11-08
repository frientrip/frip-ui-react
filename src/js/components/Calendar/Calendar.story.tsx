import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import moment, { Moment } from 'moment';
import React from 'react';
import Button, { ButtonPrimary } from '../Button';
import { CalendarEvent } from './Calendar';
import Calendar from './index';

const events: CalendarEvent[] = [
  {
    title: `대기중 프립`,
    start: new Date(2018, 10, 11, 8, 0, 0),
    end: new Date(2018, 10, 11, 9, 0, 0),
  },
  {
    title: '오픈 일정',
    start: new Date(2018, 10, 1, 9, 15, 0),
    end: new Date(2018, 10, 1, 10, 45, 0),
  },
  {
    title: '마감 일정',
    start: new Date(2018, 10, 11, 13, 15, 0),
    end: new Date(2018, 10, 12, 13, 45, 0),
  },
  {
    title: '취소 일정',
    start: new Date(2018, 10, 14, 13, 15, 0),
    end: new Date(2018, 10, 14, 13, 45, 0),
  },
];

const slotSelectLogger = action('Slot Selected');
const eventClickLogger = action('Event clicked');

class CalendarStory extends React.Component<any, {currentDate: Moment}> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentDate: moment(),
    };
  }
  public render() {
    return (
      <div style={{ height: '100%', position: 'relative' }}>
        <ButtonPrimary labelText="이전" onClick={() => this.setState((state: any) => ({
          currentDate: state.currentDate.subtract(1, 'month'),
        }))} />
        <ButtonPrimary labelText="이후" onClick={() => this.setState((state: any) => ({
          currentDate: state.currentDate.add(1, 'month'),
        }))} />
        <ButtonPrimary labelText="오늘" onClick={() => this.setState({
          currentDate: moment(),
        })} />
        <Calendar
          currentDate={this.state.currentDate.toDate()}
          events={events}
          onSelectDate={slotInfo => slotSelectLogger(slotInfo)}
          onSelectEvent={event => eventClickLogger(event)}
        />
      </div>
    );
  }
}

storiesOf('Calendar', module)
  .add('Demo', () => (
    <CalendarStory />
  ));
