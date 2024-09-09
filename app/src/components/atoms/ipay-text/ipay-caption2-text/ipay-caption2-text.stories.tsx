import { store } from '@app/store/store';
import { SCALE_10, SCALE_16 } from '@app/styles/spacing.const';
import { IPayCaption2Text, IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors.const';
import { Provider } from 'react-redux';

const IPayCaption2TextMeta: Meta<typeof IPayCaption2Text> = {
  title: 'components/text/ipay-caption2-text/IPayCaption2Text',
  component: IPayCaption2Text,
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

export default IPayCaption2TextMeta;

export const Basic: StoryObj<typeof IPayCaption2Text> = {};

export const Caption2Regular: StoryObj<typeof IPayCaption2Text> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.natural.natural1000,
      fontSize: SCALE_10,
      fontWeight: '400',
    },
  },
};

export const Caption2Bold: StoryObj<typeof IPayCaption2Text> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.natural.natural1000,
      fontSize: SCALE_10,
      fontWeight: '700',
    },
  },
};
