import colors from '@app/styles/colors.const';
import { Meta, Story } from '@storybook/react';
import IPayLinearGradientView from './ipay-linear-gradient.component';

export default {
  title: 'components/gradient/IPayLinearGradientView',
  component: IPayLinearGradientView,
} as Meta;

const Template: Story = (args) => <IPayLinearGradientView {...args} />;

export const PrimaryGradientText = Template.bind({});
PrimaryGradientText.args = {
  testID: 'default-linear-gradient',
  gradientColors: colors.gradientPrimary,
};

export const SecondryGradientText = Template.bind({});
SecondryGradientText.args = {
  testID: 'default-linear-gradient',
  gradientColors: colors.gradientSecondary,
};
