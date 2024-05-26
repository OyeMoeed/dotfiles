import { store } from '@app/store/store';
import { IPayView } from '@components/atoms';
import { IPayButton } from '@components/molecules';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';

const IPayButtonMeta: Meta<typeof IPayButton> = {
  title: 'components/buttons/IPayButton',
  component: IPayButton,
  argTypes: {
    onPress: { action: 'pressed the button' }
  },
  args: {
    btnText: 'Hello world',
    btnStyle: {
      backgroundColor: 'red',
      height: 40
    },
    textStyle: {
      color: 'white'
    }
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

export default IPayButtonMeta;

export const Basic: StoryObj<typeof IPayButton> = {};

export const SmallerButton: StoryObj<typeof IPayButton> = {
  args: {
    btnText: 'Hello world',
    btnStyle: {
      backgroundColor: 'green',
      height: 40
    }
  }
};
