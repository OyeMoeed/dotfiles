import React from 'react';
import { RNView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors';
import { SCALE_14, SCALE_60 } from '@styles/spacing';
import { store } from '@app/store/store';
import { Provider } from 'react-redux';
import RNChip from './rn-chip.component';

const RNChipMeta: Meta<typeof RNChip> = {
  title: 'Components/Input Fields/RNChip',
  component: RNChip,
  args: {
    textValue: 'Text',
    style: {
      color: colors.secondary.secondary500,
      fontSize: SCALE_14
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
    textValue: 'Text ',
    style: {
      color: colors.yellow800,
      fontSize: SCALE_14
    }
  }
};

export const Chip2: StoryObj<typeof RNChip> = {
  args: {
    textValue: 'Text ',
    style: {
      color: colors.tertiary.tertiary500,
      fontSize: SCALE_14
    }
  }
};

export const Chip3: StoryObj<typeof RNChip> = {
  args: {
    textValue: 'Text ',
    style: {
      color: colors.natural.natural700,
      fontSize: SCALE_14
    }
  }
};
