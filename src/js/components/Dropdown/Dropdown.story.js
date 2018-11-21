import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Dropdown from './Dropdown';

class DropdownWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '선택하세요..',
    };
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(value) {
    action(`Dropdown value changes to ${value}`);
    this.setState({ value });
  }

  render() {
    return (
      <Dropdown
        {...this.props}
        className={this.props.className}
        disabled={this.props.disabled}
        label={this.props.label}
        onChange={this.changeValue}
      >
        {this.props.children}
      </Dropdown>
    );
  }
}

storiesOf('Dropdown', module)
  .add('Dropdown', () => (
    <DropdownWrapper>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </DropdownWrapper>
  ))
  .add('Invaild dropdown', () => (
    <DropdownWrapper invalid>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </DropdownWrapper>
  ))
  .add('Dropdown with disabled option', () => (
    <DropdownWrapper>
      <option value="1" disabled>Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </DropdownWrapper>
  ))
  .add('Dropdown with specific width', () => {
    const StyledDropdownWrapper = styled(DropdownWrapper)`
      width: 150px;
    `;
    return (
      <StyledDropdownWrapper>
        <option value="1">Option 1</option>
        <option value="2">Very very very very very very very very long option</option>
        <option value="3">Option 3</option>
      </StyledDropdownWrapper>
    );
  })
  .add('Dropdown with Label', () => (
    <div style={{ width: '200px' }}>
      <DropdownWrapper label="Dropdown title">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </DropdownWrapper>
    </div>
  ))
  .add('Dropdown (disabled)', () => (
    <div style={{ width: '200px' }}>
      <DropdownWrapper disabled label="Option A">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </DropdownWrapper>
    </div>
  ))
  .add('Dropdown max height', () => (
    <div style={{ width: '200px' }}>
      <DropdownWrapper label="Option A">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 3</option>
        <option value="5">Option 3</option>
        <option value="6">Option 3</option>
        <option value="7">Option 3</option>
        <option value="8">Option 3</option>
        <option value="9">Option 3</option>
        <option value="10">Option 3</option>
        <option value="11">Option 3</option>
        <option value="12">Option 3</option>
        <option value="13">Option 3</option>
        <option value="14">Option 3</option>
        <option value="15">Option 3</option>
        <option value="16">Option 3</option>
        <option value="17">Option 3</option>
        <option value="18">Option 3</option>
        <option value="19">Option 3</option>
        <option value="20">Option 3</option>
        <option value="21">Option 3</option>
        <option value="22">Option 3</option>
        <option value="23">Option 3</option>
        <option value="24">Option 3</option>
        <option value="25">Option 3</option>
      </DropdownWrapper>
    </div>
  ));
