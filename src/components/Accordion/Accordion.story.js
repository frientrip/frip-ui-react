import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Accordion from './Accordion';

storiesOf('Accordion', module)
  .add('Accordion Default', () => (
    <Accordion contents={[<span>abc</span>, <span>def</span>]} sectionLabels={['ONE', 'TWO']} />
  ));
