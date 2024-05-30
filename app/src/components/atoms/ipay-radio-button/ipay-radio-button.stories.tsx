import { store } from '@app/store/store';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import IPayRadioButton from './ipay-radio-button.component';

export default {
  title: 'components/display/IPayRadioButton',
  component: IPayRadioButton,
} as Meta;

const Template: Story = (args) => (
  <Provider store={store}>
    <IPayRadioButton {...args} />
  </Provider>
);

export const Default = Template.bind({});
Default.args = {
  testID: 'default-radio-button',
  isCheck: false,
  onPress: () => {},
  disabled: false,
};

export const Checked = Template.bind({});
Checked.args = {
  testID: 'checked-radio-button',
  isCheck: true,
  onPress: () => {},
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  testID: 'disabled-radio-button',
  isCheck: false,
  onPress: () => {},
  disabled: true,
};
