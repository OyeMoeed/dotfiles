import { store } from '@app/store/store';
import { SCALE_12, SCALE_16 } from '@app/styles/spacing.const';
import { IPayCaption1Text, IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors.const';
import { Provider } from 'react-redux';

const IPayCaption1TextMeta: Meta<typeof IPayCaption1Text> = {
  title: 'components/text/ipay-caption1-text/IPayCaption1Text',
  component: IPayCaption1Text,
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

export default IPayCaption1TextMeta;

export const Basic: StoryObj<typeof IPayCaption1Text> = {};

export const Caption1Regular: StoryObj<typeof IPayCaption1Text> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_12,
      fontWeight: '400',
    },
  },
};

export const Caption1Bold: StoryObj<typeof IPayCaption1Text> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_12,
      fontWeight: '700',
    },
  },
};
