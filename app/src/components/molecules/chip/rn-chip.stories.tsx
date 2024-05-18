import React from 'react';
import { RNView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors';
import { store } from '@app/store/store';
import { Provider } from 'react-redux';
import RNChip from './rn-chip.component';

const RNChipMeta: Meta<typeof RNChip> = {
  title: 'Components/input fields/RNChip',
  component: RNChip,
  args: {
    textValue: 'Text',
    headingStyles: {
      color: colors.secondary.secondary500
    }
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <RNView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Story />
        </RNView>
      </Provider>
    )
  ]
};

export default RNChipMeta;

export const Basic: StoryObj<typeof RNChip> = {};

export const Chip: StoryObj<typeof RNChip> = {
  args: {
    textValue: 'Hello ',
    headingStyles: {
      color: colors.yellow800
    }
  }
};

export const Chip2: StoryObj<typeof RNChip> = {
  args: {
    textValue: 'Hello ',
    headingStyles: {
      color: colors.tertiary.tertiary500
    }
  }
};
export const Chip3: StoryObj<typeof RNChip> = {
  args: {
    textValue: 'Hello ',
    headingStyles: {
      color: colors.natural.natural700
    }
  }
};
