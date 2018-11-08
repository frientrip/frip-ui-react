import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
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
const primaryButtonClickLogger = action('Primary button clicked');

storiesOf('Calendar', module)
  .add('Demo', () => (
    <div style={{ height: '100%', position: 'relative' }}>
      <Calendar
        events={events}
        onSelectDate={slotInfo => slotSelectLogger(slotInfo)}
        onSelectEvent={event => eventClickLogger(event)}
        primaryButtonLabel="프라이머리 버튼"
        onClickPrimaryButton={() => primaryButtonClickLogger()}
      />
    </div>
  ));
