import { IPayView } from '@components/atoms';
import { IPayButton } from '@components/molecules';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

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
      <IPayView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </IPayView>
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
