import React from 'react';
import { Meta, Story } from '@storybook/react';
import IPayRadioButton from './ipay-radio-button.component';

export default {
  title: 'Components/Input/IPayRadioButton',
  component: IPayRadioButton,
} as Meta;

const Template: Story = (args) => <IPayRadioButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  testID: 'default-radio-button',
  isCheck: false,
  onPress: () => {
    console.log('Radio button pressed');
  },
  disabled: false,
};

export const Checked = Template.bind({});
Checked.args = {
  testID: 'checked-radio-button',
  isCheck: true,
  onPress: () => {
    console.log('Radio button pressed');
  },
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  testID: 'disabled-radio-button',
  isCheck: false,
  onPress: () => {
    console.log('Radio button pressed');
  },
  disabled: true,
};
