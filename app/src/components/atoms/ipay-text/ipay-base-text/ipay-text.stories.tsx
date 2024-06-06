import { store } from '@app/store/store';
import { scaleFont } from '@app/styles/mixins';
import { IPayText, IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors.const';
import { Provider } from 'react-redux';

const IPayTextMeta: Meta<typeof IPayText> = {
  title: 'components/text/IPayText',
  component: IPayText,
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: scaleFont(16),
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

export const SmallerText: StoryObj<typeof IPayText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.green,
      fontSize: scaleFont(12),
      fontWeight: '400',
    },
  },
};

export const SmallerTextBold: StoryObj<typeof IPayText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.green,
      fontSize: scaleFont(12),
      fontWeight: '700',
    },
  },
};

export const LargerText: StoryObj<typeof IPayText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: scaleFont(20),
      fontWeight: '400',
    },
  },
};

export const LargerTextBold: StoryObj<typeof IPayText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: scaleFont(20),
      fontWeight: '700',
    },
  },
};
