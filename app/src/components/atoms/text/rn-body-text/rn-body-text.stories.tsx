import { store } from '@app/store/store';
import { RNText, RNView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors';
import { SCALE_18, SCALE_16 } from '@styles/spacing';
import React from 'react';
import { Provider } from 'react-redux';

const RNTextMeta: Meta<typeof RNText> = {
  title: 'components/text/rn-body-text/RNText',
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

export const BodyRegular: StoryObj<typeof RNText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_18,
      fontWeight: '400'
    }
  }
};

export const BodyBold: StoryObj<typeof RNText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_18,
      fontWeight: '700'
    }
  }
};
