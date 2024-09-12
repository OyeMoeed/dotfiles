import { JSX } from 'react';
import colors from '@app/styles/colors.const';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, StoryFn } from '@storybook/react';
import IPayLinearGradientView from './ipay-linear-gradient.component';
import { IPayLinearGradientViewProps } from './ipay-linear-gradient.interface';

export default {
  title: 'components/gradient/IPayLinearGradientView',
  component: IPayLinearGradientView,
} as Meta;

const Template: StoryFn = (args: JSX.IntrinsicAttributes & IPayLinearGradientViewProps) => (
  <IPayLinearGradientView {...args} />
);

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
