import { store } from '@app/store/store';
import { IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import IPayPickerButton from './ipay-picker-button.component';

const IPayPickerButtonMeta: Meta<typeof IPayPickerButton> = {
  title: 'components/display/IPayPickerButton',
  component: IPayPickerButton,
  args: {
    variant: 'date',
    date: new Date(),
    text: 'Sample Text',
    onPress,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['date', 'text', 'time', 'dateAndTime'],
    },
    date: {
      control: { type: 'date' },
    },
    text: {
      control: { type: 'text' },
    },
    onPress: { action: 'pressed' },
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

export default IPayPickerButtonMeta;

export const DateVariant: StoryObj<typeof IPayPickerButton> = {
  args: {
    variant: 'date',
    date: new Date(),
  },
};

export const TextVariant: StoryObj<typeof IPayPickerButton> = {
  args: {
    variant: 'text',
    text: 'Sample Text',
  },
};

export const TimeVariant: StoryObj<typeof IPayPickerButton> = {
  args: {
    variant: 'time',
    date: new Date(),
  },
};

export const DateAndTimeVariant: StoryObj<typeof IPayPickerButton> = {
  args: {
    variant: 'dateAndTime',
    date: new Date(),
  },
};
