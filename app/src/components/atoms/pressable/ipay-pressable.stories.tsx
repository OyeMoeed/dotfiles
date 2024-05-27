import React from 'react';
import { Story, Meta } from '@storybook/react';
import IPayPressable from './ipay-pressable.component';

export default {
  title: 'Components/Interaction/IPayPressable',
  component: IPayPressable
} as Meta;

const Template: Story = (args) => (
  <IPayPressable {...args}>
    {/* Add any children components you want to display within the pressable area */}
  </IPayPressable>
);

export const Default = Template.bind({});
Default.args = {
  testID: 'default-pressable'
};

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
  testID: 'custom-styles-pressable',
  style: { backgroundColor: 'blue', padding: 10 }
};

export const WithOnPress = Template.bind({});
WithOnPress.args = {
  testID: 'onpress-pressable',
  onPress: () => {
    console.log('IPayPressable pressed');
  }
};
