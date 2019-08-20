import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Calendar from './';

storiesOf('Calendar', module)
  .add('Demo', () => (
    <div style={{ height: '100%', position: 'relative' }}>
      <Calendar
        selectable
      />
    </div>
  ));
