import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ButtonGroup from './ButtonGroup';

storiesOf('ButtonGroup', module)
  .add('ButtonGroup', () => (
    <ButtonGroup buttons={[{ labelText: '치킨', isActive: true }, { labelText: '족발' }, { labelText: '피자', isActive: true }, { labelText: '남한산성 삼계탕' }]} onChange={action('ButtonGroup pressed')} />
  ));
