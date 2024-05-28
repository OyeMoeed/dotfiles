import React from 'react';
import { IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '@app/store/store';
import { User } from '@app/assets/svgs/svg';
import IPayTextInput from './ipay-textinput.component';
import styles from './ipay-textinput.style';

const IPayTextInputMeta: Meta<typeof IPayTextInput> = {
  title: 'Components/Input Fields/RNTextInput',
  component: IPayTextInput,
  args: {
    testID: 'RNTextInput',
    text: 'Default Input',
    placeholder: 'Enter text here',
    placeholderTextColor: '#999',
    autoCapitalize: 'none',
    rightIcon: <User />,
    maxLength: 100,
    multiline: false,
    keyboardType: 'default',
    onBlur: () => {},
    onChangeText: () => {},
    onFocus: () => {},
    onSubmitEditing: () => {},
    containerStyle: {},
    headingStyles: {},
    label: 'Label',
    isError: false,
    assistiveText: '',
    editable: true,
    showLeftIcon: true,
    onClearInput: () => {},
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <IPayView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Story />
        </IPayView>
      </Provider>
    ),
  ],
};

export default IPayTextInputMeta;

export const Basic: StoryObj<typeof IPayTextInput> = {};

export const BasicTextInput: StoryObj<typeof IPayTextInput> = {
  args: {
    text: 'Primary Input',
  },
};

export const TextInputWithBackground: StoryObj<typeof IPayTextInput> = {
  args: {
    text: 'Secondary Input',
    containerStyle: { backgroundColor: '#f0f0f0' },
  },
};

export const FocusedTextInput: StoryObj<typeof IPayTextInput> = {
  args: {
    text: 'Focused Input',
    containerStyle: styles.focusedContainer,
  },
};

export const DisabledTextInput: StoryObj<typeof IPayTextInput> = {
  args: {
    text: 'Disabled Input',
    containerStyle: styles.disabledContainer,
    editable: false,
  },
};

export const ErrorTextInput: StoryObj<typeof IPayTextInput> = {
  args: {
    text: 'Error State',
    containerStyle: styles.errorContainer,
    isError: true,
    assistiveText: 'Please enter valid information',
  },
};
