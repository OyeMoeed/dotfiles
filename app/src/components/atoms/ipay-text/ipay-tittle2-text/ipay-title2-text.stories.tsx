import { store } from '@app/store/store';
import { SCALE_16, SCALE_22 } from '@app/styles/spacing.const';
import { IPayTitle2Text, IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors.const';
import { Provider } from 'react-redux';

const IPayTitle2TextMeta: Meta<typeof IPayTitle2Text> = {
  title: 'components/text/ipay-title2-text/IPayTitle2Text',
  component: IPayTitle2Text,
  args: {
    text: 'Hello world',
    style: {
      color: colors.natural.natural1000,
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

export default IPayTitle2TextMeta;

export const Basic: StoryObj<typeof IPayTitle2Text> = {};

export const Ttile2Regular: StoryObj<typeof IPayTitle2Text> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.natural.natural1000,
      fontSize: SCALE_22,
      fontWeight: '400',
    },
  },
};

export const Title2Bold: StoryObj<typeof IPayTitle2Text> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.natural.natural1000,
      fontSize: SCALE_22,
      fontWeight: '700',
    },
  },
};
