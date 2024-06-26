

import { Meta, Story } from '@storybook/react';
import React from 'react';
import IPayAmountHeader from './ipay-amount-header.component'; // Correct import
import { IPayAmountHeaderProps } from './ipay-amount-header.interface'; // Correct import

export default {
  title: 'components/headers/IPayAmountHeader',
  component: IPayAmountHeader,
} as Meta;

// Define a template for the stories
const Template: Story<IPayAmountHeaderProps> = (args) => <IPayAmountHeader {...args} />;

// Define different variants of the component based on props

// Example for a typical Card Variant
export const CardVariant = Template.bind({});
CardVariant.args = {
  title: 'Card Payment',
  icon: 'card',
  subtitle: 'Use your card',
  cardIcon1: "visa",
  cardIcon2: 'mastercard',
  cardIcon3: 'mada',
  showCardIcons: true,
};

// Example for an Apple Pay Variant
export const ApplePayVariant = Template.bind({});
ApplePayVariant.args = {
  title: 'Apple Pay',
  icon: 'apple-pay-icon',
  subtitle: 'Pay with Apple Pay',
  showCardIcons: false,
};

// Example for a No Icon Variant
export const NoIconVariant = Template.bind({});
NoIconVariant.args = {
  title: 'No Icon Payment',
  subtitle: 'Simple payment option',
  showCardIcons: false,
};

