import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MenuSection from './MenuSection';
import MenuItem from './MenuItem';
import HostIcon from '../../assets/svgs/ic-host-black.svg';
import ControlIcon from '../../assets/svgs/ic-control-black.svg';

storiesOf('Menu', module)
  .add('Short MenuSection', () => (
    <div style={{ width: '300px' }}>
      <MenuSection label="프립 관리">
        <li>STUFFS</li>
        just a string
        <p><span>HAHAHA</span></p>
        <MenuItem label="That's it!" onClick={action('MenuItem Clicked')} />
        <MenuItem label="Despacito" />
      </MenuSection>
    </div>
  ))
  .add('Mobile MenuSection', () => (
    <div style={{ width: '300px' }}>
      <MenuSection isMobile label="프립 관리" icon={HostIcon}>
        <MenuItem label="출석부" onClick={action('MenuItem Clicked')} />
        <MenuItem label="Q&A관리" />
        <MenuItem label="후기 관리" />
      </MenuSection>
    </div>
  ))
  .add('Long MenuSection', () => (
    <MenuSection label="MenuSection">
      <MenuItem label="That's it!" onClick={action('MenuItem Clicked')} />
      <MenuItem label="Despacito" />
      <MenuItem label="Despacito" />
      <MenuItem label="Despacito" />
      <MenuItem label="Despacito" />
      <MenuItem label="Despacito" />
      <MenuItem label="Que Bonita" />
    </MenuSection>
  ))
  .add('Stacked MenuSections', () => (
    <div style={{ width: '300px' }}>
      <MenuSection icon={HostIcon} label="홈" />
      <MenuSection icon={ControlIcon} label="프립 관리">
        <MenuItem label="That's it!" onClick={action('MenuItem Clicked')} />
        <MenuItem label="Despacito" isSelected />
        <MenuItem label="Que Bonita" />
      </MenuSection>
      <MenuSection icon={HostIcon} label="호스트 관리">
        <MenuItem label="That's it!" onClick={action('MenuItem Clicked')} />
        <MenuItem label="Despacito" />
        <MenuItem label="Despacito" />
        <MenuItem label="Despacito" />
        <MenuItem label="Despacito" />
        <MenuItem label="Que Bonita" />
      </MenuSection>
    </div>

  ));
