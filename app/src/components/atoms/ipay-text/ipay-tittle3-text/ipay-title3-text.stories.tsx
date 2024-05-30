import { store } from '@app/store/store';
import { SCALE_16, SCALE_20 } from '@app/styles/spacing.const';
import { IPayTitle3Text, IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors.const';
import { Provider } from 'react-redux';

const IPayTitle3TextMeta: Meta<typeof IPayTitle3Text> = {
  title: 'components/text/ipay-title3-text/IPayTitle3Text',
  component: IPayTitle3Text,
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

export default IPayTitle3TextMeta;

export const Basic: StoryObj<typeof IPayTitle3Text> = {};

export const Ttile3Regular: StoryObj<typeof IPayTitle3Text> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_20,
      fontWeight: '400',
    },
  },
};

export const Title3Bold: StoryObj<typeof IPayTitle3Text> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_20,
      fontWeight: '700',
    },
  },
};
