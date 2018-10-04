import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button, ButtonPrimary, ButtonDanger, ButtonGhost, ButtonGhostPrimary, IconButton } from './Button';
import DownloadIcon from '../../assets/svgs/ic-download-grey.svg';

storiesOf('Button', module)
  .add('Button Default', () => (
    <Button labelText="Button Default" onClick={action('Button Default Clicked')} />
  ))
  .add('Button Default (disabled)', () => (
    <Button labelText="Button Default" onClick={action('Button Default Clicked')} disabled />
  ))
  .add('Button fluid', () => (
    <Button fluid labelText="Button fluid" onClick={action('Button Default Clicked')} />
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
  ))
  .add('Button Ghost Primary', () => (
    <ButtonGhostPrimary labelText="Button Ghost" onClick={action('Button Ghost Primary Clicked')} />
  ))
  .add('Button Ghost Primary (disabled)', () => (
    <ButtonGhostPrimary labelText="Button Ghost" onClick={action('Button Ghost Primary Clicked')} disabled />
  ))
  .add('Button Ghost Primary (loading)', () => (
    <ButtonGhostPrimary labelText="Button Ghost" onClick={action('Button Ghost Primary Clicked')} isLoading />
  ))
  .add('Button Danger Large', () => (
    <ButtonDanger large labelText="Button Danger Large" onClick={action('Button Danger Large Clicked')} />
  ))
  .add('Button Ghost Primary Fluid', () => (
    <ButtonGhostPrimary fluid labelText="Button Ghost" onClick={action('Button Ghost Primary Fluid Clicked')} />
  ))
  .add('Button Ghost w/ Icon', () => (
    <ButtonGhost labelText="Download File" icon={DownloadIcon} onClick={action('Button Ghost w/ Icon Clicked')} />
  ))
  .add('Buttons Side by Side', () => (
    <div>
      <ButtonGhost labelText="Button Ghost" onClick={action('Button Ghost Clicked')} />
      <span> </span>
      <ButtonPrimary labelText="Button Primary" onClick={action('Button Primary Clicked')} />
      <span> </span>
      <ButtonDanger labelText="Button Danger" onClick={action('Button Danger Clicked')} />
    </div>
  ))
  .add('Button w/ Icon', () => (
    <ButtonGhost labelText="Download File" icon={DownloadIcon} onClick={action('Button Ghost w/ Icon Clicked')} />
  ))
  .add('Icon Button', () => (
    <IconButton icon={DownloadIcon} onClick={action('Button Ghost w/ Icon Clicked')} />
  ));
