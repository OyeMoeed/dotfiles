import { Meta, Story } from '@storybook/react';
import IPayOverlay from './ipay-overlay.component';

export default {
  title: 'components/overlay/IPayOverlay',
  component: IPayOverlay,
} as Meta;

const Template: Story = (args) => <IPayOverlay {...args} />;

export const Default = Template.bind({});
Default.args = {
  testID: 'default-overlay',
};

export const WithOnPress = Template.bind({});
WithOnPress.args = {
  testID: 'onpress-overlay',
  onPress: () => {},
};
