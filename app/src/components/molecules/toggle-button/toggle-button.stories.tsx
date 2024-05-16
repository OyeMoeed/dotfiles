import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToggleButton } from '@components/molecules';
import { RNView } from '@components/atoms';

const ToggleButtonMeta: Meta<typeof ToggleButton> = {
  title: 'components/buttons/ToggleButton',
  component: ToggleButton,
  argTypes: {
    onToggleChange: { action: 'pressed the button' }
  },
  args: {},
  decorators: [
    (Story) => (
      <RNView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </RNView>
    )
  ]
};

export default ToggleButtonMeta;

export const Basic: StoryObj<typeof ToggleButton> = {};
