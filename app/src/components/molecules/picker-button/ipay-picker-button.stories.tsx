import { store } from '@app/store/store';
import { IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import PickerButton from './ipay-picker-button.component';

const PickerButtonMeta: Meta<typeof PickerButton> = {
  title: 'components/display/PickerButton',
  component: PickerButton,
  args: {
    variant: 'date',
    date: new Date(),
    text: 'Sample Text',
    onPress: () => console.log('Pressed')
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['date', 'text', 'time', 'dateAndTime']
    },
    date: {
      control: { type: 'date' }
    },
    text: {
      control: { type: 'text' }
    },
    onPress: { action: 'pressed' }
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <IPayView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Story />
        </IPayView>
      </Provider>
    )
  ]
};

export default PickerButtonMeta;

export const DateVariant: StoryObj<typeof PickerButton> = {
  args: {
    variant: 'date',
    date: new Date()
  }
};

export const TextVariant: StoryObj<typeof PickerButton> = {
  args: {
    variant: 'text',
    text: 'Sample Text'
  }
};

export const TimeVariant: StoryObj<typeof PickerButton> = {
  args: {
    variant: 'time',
    date: new Date()
  }
};

export const DateAndTimeVariant: StoryObj<typeof PickerButton> = {
  args: {
    variant: 'dateAndTime',
    date: new Date()
  }
};
