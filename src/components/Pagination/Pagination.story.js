import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PageButton, PrevButton, NextButton } from './PageButton';


const StoryWrapper = styled.div`
  display: flex;
  padding: 10px;
  background-color: lightgrey;
`;

storiesOf('Pagination', module)
  .add('Page Button', () => (
    <StoryWrapper>
      <PrevButton disabled />
      <PageButton label="1" isSelected />
      <PageButton label="2" />
      <NextButton />
    </StoryWrapper>
  ));
