import { store } from '@app/store/store';
import { SCALE_16, SCALE_18 } from '@app/styles/spacing.const';
import { IPayHeadlineText, IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors.const';
import { Provider } from 'react-redux';

const IPayHeadlineTextMeta: Meta<typeof IPayHeadlineText> = {
  title: 'components/text/ipay-headline-text/IPayHeadlineText',
  component: IPayHeadlineText,
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

export default IPayHeadlineTextMeta;

export const Basic: StoryObj<typeof IPayHeadlineText> = {};

export const HeadlineRegular: StoryObj<typeof IPayHeadlineText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.natural.natural1000,
      fontSize: SCALE_18,
      fontWeight: '400',
    },
  },
};

export const HeadlineBold: StoryObj<typeof IPayHeadlineText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.natural.natural1000,
      fontSize: SCALE_18,
      fontWeight: '700',
    },
  },
};
