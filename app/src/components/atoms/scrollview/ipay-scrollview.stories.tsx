import React from 'react';
import { Meta, Story } from '@storybook/react';
import IPayScrollView from './ipay-scrollview.component';

export default {
  title: 'Components/Display/IPayScrollView',
  component: IPayScrollView,
} as Meta;

const Template: Story = (args) => (
  <IPayScrollView {...args}>{/* Add any child components you want to display within the scroll view */}</IPayScrollView>
);

export const Default = Template.bind({});
Default.args = {
  testID: 'default-scroll-view',
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  testID: 'horizontal-scroll-view',
  horizontal: true,
};

export const WithRefreshControl = Template.bind({});
WithRefreshControl.args = {
  testID: 'with-refresh-control-scroll-view',
  refreshControl: <RefreshControl refreshing={false} onRefresh={() => {}} />, // You need to import RefreshControl from 'react-native' if not already imported
};
