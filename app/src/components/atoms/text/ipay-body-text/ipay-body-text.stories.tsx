import { store } from '@app/store/store';
import { IPayText, IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors.const';
import { SCALE_16, SCALE_18 } from '@styles/spacing.styles';
import React from 'react';
import { Provider } from 'react-redux';

const IPayTextMeta: Meta<typeof IPayText> = {
  title: 'components/text/rn-body-text/RNText',
  component: IPayText,
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_16,
      fontWeight: '500',
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <IPayView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Story />
        </IPayView>
      </Provider>
    ),
  ],
};

export default IPayTextMeta;

export const Basic: StoryObj<typeof IPayText> = {};

export const BodyRegular: StoryObj<typeof IPayText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_18,
      fontWeight: '400',
    },
  },
};

export const BodyBold: StoryObj<typeof IPayText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_18,
      fontWeight: '700',
    },
  },
};
