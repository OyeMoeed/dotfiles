import { Meta, Story } from '@storybook/react';
import IPayPressable from './ipay-pressable.component';

export default {
  title: 'components/interaction/IPayPressable',
  component: IPayPressable,
} as Meta;

const Template: Story = (args) => (
  <IPayPressable {...args}>
    {/* Add any children components you want to display within the pressable area */}
  </IPayPressable>
);

export const Default = Template.bind({});
Default.args = {
  testID: 'default-pressable',
};

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
  testID: 'custom-styles-pressable',
  style: { backgroundColor: 'blue', padding: spacing.SCALE_10 },
};

export const WithOnPress = Template.bind({});
WithOnPress.args = {
  testID: 'onpress-pressable',
  onPress: () => {},
};
