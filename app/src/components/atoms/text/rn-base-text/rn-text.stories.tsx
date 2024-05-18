import { store } from '@app/store/store';
import { RNText, RNView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors';
import { SCALE_12, SCALE_16, SCALE_20 } from '@styles/spacing';
import React from 'react';
import { Provider } from 'react-redux';

const RNTextMeta: Meta<typeof RNText> = {
  title: 'components/text/RNText',
  component: RNText,
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
      <Provider store={store}>
        <RNView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Story />
        </RNView>
      </Provider>
    )
  ]
};

export default RNTextMeta;

export const Basic: StoryObj<typeof RNText> = {};

export const SmallerText: StoryObj<typeof RNText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.green,
      fontSize: SCALE_12,
      fontWeight: '400'
    }
  }
};

export const SmallerTextBold: StoryObj<typeof RNText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.green,
      fontSize: SCALE_12,
      fontWeight: '700'
    }
  }
};

export const LargerText: StoryObj<typeof RNText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_20,
      fontWeight: '400'
    }
  }
};

export const LargerTextBold: StoryObj<typeof RNText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_20,
      fontWeight: '700'
    }
  }
};
