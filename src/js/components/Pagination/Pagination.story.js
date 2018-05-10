import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PageButton, PrevButton, NextButton } from './PageButton';

storiesOf('Pagination', module)
  .add('Page Button', () => (
    <div>
      <PrevButton />
      <PageButton label="1" />
      <NextButton />
    </div>
  ));
