import React from 'react';
import { Meta, Story } from '@storybook/react';
import IPayTitleWithText from './ipay-title-with-text.component';

export default {
  title: 'Components/Display/IPayTitleWithText',
  component: IPayTitleWithText,
} as Meta;

const Template: Story = (args) => <IPayTitleWithText {...args} />;

export const Default = Template.bind({});
Default.args = {
  heading: 'Title',
  text: 'This is some text.',
};
