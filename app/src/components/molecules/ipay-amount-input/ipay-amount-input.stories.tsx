import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import IPayAmountInput from './ipay-amount-input.component';
import { IPayAmountInputProps } from './ipay-amount-input.interface';

export default {
  title: 'components/inputs/IPayAmountInput',
  component: IPayAmountInput,
} as Meta;

const Template: StoryFn<IPayAmountInputProps> = (args) => {
  // State to manage the amount input
  const [amount, setAmount] = useState(args.amount || '');

  return (
    <IPayAmountInput
      {...args}
      amount={amount}
      onAmountChange={setAmount} // Update the state on amount change
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  testID: 'default-amount-input',
  amount: '',
  onAmountChange: (newAmount: string) => console.log('Amount changed to:', newAmount),
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  testID: 'initial-value-amount-input',
  amount: '100',
  onAmountChange: (newAmount: string) => console.log('Amount changed to:', newAmount),
};

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
  testID: 'custom-styles-amount-input',
  amount: '',
  onAmountChange: (newAmount: string) => console.log('Amount changed to:', newAmount),
  style: { borderWidth: 1, borderColor: 'gray', padding: moderateScale(10) },
};

export const WithIconPress = Template.bind({});
WithIconPress.args = {
  testID: 'icon-press-amount-input',
  amount: '50',
  onAmountChange: (newAmount: string) => console.log('Amount changed to:', newAmount),
};
