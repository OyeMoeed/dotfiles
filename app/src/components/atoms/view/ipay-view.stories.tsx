import { Meta, Story } from '@storybook/react';
import IPayView from './ipay-view.component';

export default {
  title: 'Components/Layout/IPayView',
  component: IPayView
} as Meta;

const Template: Story = (args) => (
  <IPayView {...args}>{/* Add any child components you want to display within the IPayView */}</IPayView>
);

export const Default = Template.bind({});
Default.args = {
  testID: 'default-view'
};

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
  testID: 'custom-styles-view',
  style: { backgroundColor: 'blue', padding: 20 }
};
