import { RNView } from '@components/atoms';
import { RNButton } from '@components/molecules';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const RNButtonMeta: Meta<typeof RNButton> = {
  title: 'components/buttons/RNButton',
  component: RNButton,
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
      <RNView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </RNView>
    )
  ]
};

export default RNButtonMeta;

export const Basic: StoryObj<typeof RNButton> = {};

export const SmallerButton: StoryObj<typeof RNButton> = {
  args: {
    btnText: 'Hello world',
    btnStyle: {
      backgroundColor: 'green',
      height: 40
    }
  }
};
