import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Dropdown from './Dropdown';

storiesOf('Dropdown', module)
  .add('Dropdown', () => (
    <Dropdown onChange={action('Dropdown select changed')}>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Dropdown>
  ))
  .add('Dropdown with default value', () => (
    <Dropdown defaultValue="1" onChange={action('Dropdown select changed')}>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Dropdown>
  ))
  .add('Dropdown with specific width', () => {
    const StyledDropdown = styled(Dropdown)`
      width: 150px;
    `;
    return (
      <StyledDropdown onChange={action('Dropdown select changed')}>
        <option value="1">Option 1</option>
        <option value="2"> Very Very Very Very Very Very Long Option 2</option>
        <option value="3">Option 3</option>
      </StyledDropdown>
    );
  })
  .add('Dropdown with Label', () => (
    <div style={{ width: '200px' }}>
      <Dropdown label="Option A" onChange={action('Dropdown select changed')}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Dropdown>
    </div>
  ))
  .add('Dropdown (disabled)', () => (
    <div style={{ width: '200px' }}>
      <Dropdown disabled label="Option A" onChange={action('Dropdown select changed')}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Dropdown>
    </div>
  ));
