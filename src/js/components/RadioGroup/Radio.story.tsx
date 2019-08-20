import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import RadioGroup from './index';

storiesOf('RadioGroup', module)
  .add('RadioGroup with Label', () => (
    <RadioGroup
      labelText="Radio Group"
      onChange={action('Radio value changed')}
      options={[{ value: 'one', labelText: 'One' }, { value: 'two', labelText: 'Two' }, { value: 'three', labelText: 'Three' }]}
    />
  ))
  .add('RadioGroup with Initial Value', () => (
    <RadioGroup
      onChange={action('Radio value changed')}
      options={[{ value: 'one', labelText: 'One' }, { value: 'two', labelText: 'Two' }, { value: 'three', labelText: 'Three' }]}
      defaultValue="three"
    />
  ));
