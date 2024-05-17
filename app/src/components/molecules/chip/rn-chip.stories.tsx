import { RNView } from '@components/atoms';
import { RNChip } from '@components/molecules';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors';
import { SCALE_14, SCALE_60 } from '@styles/spacing';
import React from 'react';

const RNChipMeta: Meta<typeof RNChip> = {
  title: 'components/input feilds/RNChip',
  component: RNChip,
  argTypes: {

  },
  args: {
    textValue: 'Text',
    containerStyle: {
      height: SCALE_60,
      justifyContent: 'center'
    },
    headingStyles: {
      color: colors.black,
      fontSize: SCALE_14
    },
  },
  decorators: [
    (Story) => (
      <RNView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </RNView>
    )
  ]
};

export default RNChipMeta;

export const Basic: StoryObj<typeof RNChipMeta> = {};






