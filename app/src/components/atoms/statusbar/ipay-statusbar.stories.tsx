import { Meta, Story } from '@storybook/react';
import IPayStatusBar from './ipay-statusbar.component';

export default {
  title: 'Components/Display/IPayStatusBar',
  component: IPayStatusBar,
} as Meta;

const Template: Story = (args) => <IPayStatusBar {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithCustomBackgroundColor = Template.bind({});
WithCustomBackgroundColor.args = {
  backgroundColor: 'blue',
};

export const WithCustomBarStyle = Template.bind({});
WithCustomBarStyle.args = {
  barStyle: 'light-content',
};
