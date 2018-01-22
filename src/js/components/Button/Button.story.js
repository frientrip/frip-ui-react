import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button, { ButtonPrimary, ButtonDanger, ButtonGhost } from './Button';

storiesOf('Button', module)
  .add('Button Default', () => (
    <Button labelText="Button Default" onClick={action('Button Default Clicked')} />
  ))
  .add('Button Default (disabled)', () => (
    <Button labelText="Button Default" onClick={action('Button Default Clicked')} disabled />
  ))
  .add('Button Primary', () => (
    <ButtonPrimary labelText="Button Primary" onClick={action('Button Primary Clicked')} />
  ))
  .add('Button Primary (disabled)', () => (
    <ButtonPrimary labelText="Button Primary" onClick={action('Button Primary Clicked')} disabled />
  ))
  .add('Button Danger', () => (
    <ButtonDanger labelText="Button Danger" onClick={action('Button Danger Clicked')} />
  ))
  .add('Button Danger (disabled)', () => (
    <ButtonDanger labelText="Button Danger" onClick={action('Button Danger Clicked')} disabled />
  ))
  .add('Button Ghost', () => (
    <ButtonGhost labelText="Button Ghost" onClick={action('Button Ghost Clicked')} />
  ))
  .add('Button Ghost (disabled)', () => (
    <ButtonGhost labelText="Button Ghost" onClick={action('Button Ghost Clicked')} disabled />
  ));
