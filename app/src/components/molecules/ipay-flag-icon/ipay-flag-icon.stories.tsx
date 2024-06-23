import { Story, Meta } from '@storybook/react';
import IpayFlagIcon from './ipay-flag-icon.component';

export default {
  title: 'IpayFlagIcon',
  component: IpayFlagIcon,
  parameters: {
    docs: {
      description: {
        component: 'A component that renders a flag icon using Svg and Path components from react-native-svg.',
      },
    },
  },
  argTypes: {
    country: {
      control: 'text',
      description: 'The country code for the flag icon.',
    },
    testID: {
      control: 'text',
      description: 'Test ID for testing purposes.',
    },
  },
} as Meta;

const Template: Story = (args) => <IpayFlagIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  country: 'us',
  testID: 'flag-svg',
};

export const CustomCountry = Template.bind({});
CustomCountry.args = {
  country: 'in',
  testID: 'uk-flag-svg',
};

export const AnotherCustomCountry = Template.bind({});
AnotherCustomCountry.args = {
  country: 'ur',
  testID: 'fr-flag-svg',
};

