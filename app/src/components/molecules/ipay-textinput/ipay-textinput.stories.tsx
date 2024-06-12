import icons from '@app/assets/icons';
import { store } from '@app/store/store';
import colors from '@app/styles/colors.const';
import { IPayIcon, IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import IPayTextInput from './ipay-textinput.component';
import styles from './ipay-textinput.style';

const IPayTextInputMeta: Meta<typeof IPayTextInput> = {
  title: 'components/input/IPayTextInput',
  component: IPayTextInput,
  args: {
    testID: 'IPayTextInput',
    text: 'Default Input',
    placeholder: 'Enter text here',
    placeholderTextColor: '#999',
    autoCapitalize: 'none',
    rightIcon: <IPayIcon icon={icons.user} size={23} color={colors.primary.primary500} />,
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
