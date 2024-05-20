import colors from '@app/styles/colors.styles';
import { SCALE_12, SCALE_16, SCALE_20 } from '@app/styles/spacing.styles';
import { IPayText, IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const IPayTextMeta: Meta<typeof IPayText> = {
  title: 'components/text/IPayText',
  component: IPayText,
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_16,
      fontWeight: '500'
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

export default IPayTextMeta;

export const Basic: StoryObj<typeof IPayText> = {};

export const SmallerText: StoryObj<typeof IPayText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.green,
      fontSize: SCALE_12,
      fontWeight: '200'
    }
  }
};

export const LargerText: StoryObj<typeof IPayText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_20,
      fontWeight: '700'
    }
  }
};
