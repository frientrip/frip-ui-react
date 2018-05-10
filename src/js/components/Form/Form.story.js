import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from './Input';

storiesOf('Form', module)
  .add('Input', () => (
    <Input onChange={action('Input changed')} message="Description" />
  ))
  .add('Input Required', () => (
    <Input onChange={action('Input changed')} label="Name" required message="Description" />
  ))
  .add('Input Number', () => (
    <Input type="number" onChange={action('Input changed')} message="Description" />
  ))
  .add('Input with Label', () => (
    <Input label="Input Label" onChange={action('Input changed')} message="Description" />
  ))
  .add('Short Input with Label', () => (
    <div style={{ width: '150px' }}>
      <Input type="number" label="Number" onChange={action('Input changed')} message="Description" />
    </div>
  ));
