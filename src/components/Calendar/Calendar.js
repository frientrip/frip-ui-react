import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { ButtonPrimary } from '../Button';
import '../../../css/Calendar.css';

BigCalendar.momentLocalizer(moment);

// const locale = window.navigator.userLanguage || window.navigator.language;
const locale = 'ko';
moment.locale(locale);

const propTypes = {
  events: PropTypes.arrayOf([PropTypes.object]),
};

const defaultProps = {
  events: [
    {
      id: 1,
      title: '프립',
      start: new Date(2018, 4, 11, 8, 0, 0),
      end: new Date(2018, 4, 11, 9, 0, 0),
    },
    {
      id: 2,
      title: '프립',
      start: new Date(2018, 4, 11, 9, 15, 0),
      end: new Date(2018, 4, 11, 10, 45, 0),
    },
    {
      id: 3,
      title: '프립 2',
      start: new Date(2018, 4, 11, 13, 15, 0),
      end: new Date(2018, 4, 12, 13, 45, 0),
    },
  ],
};

const formats = {
};

const messages = {
  showMore: number => `+ ${number} ...`,
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  handleDateChange(date) {
    this.setState({
      date,
    });
  }
  render() {
    const {
      events,
      ...props
    } = this.props;

    return (
      <Fragment>
        <BigCalendar
          date={this.state.date}
          onNavigate={this.handleDateChange}
          events={events}
          formats={formats}
          messages={messages}
          {...props}
        />
        <ButtonPrimary labelText="2018/09" onClick={() => this.handleDateChange(moment('09-01-2018', 'MM-DD-YYYY').toDate())} />
      </Fragment>
    );
  }
}

Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;

export default Calendar;
