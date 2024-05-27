import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '@app/store/store';
import { IPayView } from '@components/atoms';
import IPayInput from './ipay-input.component';

export default {
  title: 'Components/Input/IPayInput',
  component: IPayInput
} as Meta;

const Template: Story = (args) => {
  const [inputValue, setInputValue] = useState('');

  // Handle input change
  const handleChange = (value) => {
    setInputValue(value);
  };

  return (
    <Provider store={store}>
      <IPayView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <IPayInput {...args} text={inputValue} onChangeText={handleChange} />
      </IPayView>
    </Provider>
  );
};

export const Default = Template.bind({});
Default.args = {
  testID: 'default-input',
  placeholder: 'Enter text...'
};

export const WithText = Template.bind({});
WithText.args = {
  testID: 'with-text',
  text: 'Predefined text',
  placeholder: 'Enter text...'
};
