import { store } from '@app/store/store';
import { IPayText, IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors.const';
import { SCALE_13, SCALE_16 } from '@styles/spacing.styles';
import React from 'react';
import { Provider } from 'react-redux';

const IPayTextMeta: Meta<typeof IPayText> = {
  title: 'components/text/rn-footnote-text/IPayText',
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

export const FootnoteRegular: StoryObj<typeof IPayText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_13,
      fontWeight: '400',
    },
  },
};

export const FootnoteBold: StoryObj<typeof IPayText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_13,
      fontWeight: '700',
    },
  },
};
