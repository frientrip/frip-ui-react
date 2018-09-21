import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Tabs from './Tabs';
import Tab from './Tab';

storiesOf('Tabs', module)
  .add('Tabs', () => (
    <Tabs activeIndex={2} onChange={action('Tab Index Changed')}>
      <Tab label="First Tab">
        First Tab Content
      </Tab>
      <Tab label="Second Tab">
        Second Tab Content
      </Tab>
      <Tab label="Third Tab with Long Label">
        Third Tab Content
      </Tab>
    </Tabs>
  ))
  .add('Big Tabs', () => (
    <Tabs big activeIndex={2} onChange={action('Tab Index Changed')}>
      <Tab label="First Tab">
        First Tab Content
      </Tab>
      <Tab label="Second Tab">
        Second Tab Content
      </Tab>
      <Tab label="Third Tab with Long Label">
        Third Tab Content
      </Tab>
    </Tabs>
  ))
  .add('Justified Tabs', () => (
    <Tabs justified activeIndex={2} onChange={action('Tab Index Changed')}>
      <Tab label="First Tab">
        First Tab Content
      </Tab>
      <Tab label="Second Tab">
        Second Tab Content
      </Tab>
      <Tab label="Third Tab with Long Label">
        Third Tab Content
      </Tab>
    </Tabs>
  ));
