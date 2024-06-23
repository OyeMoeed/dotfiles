import { store } from '@app/store/store';
import { SCALE_16, SCALE_28 } from '@app/styles/spacing.const';
import { IPayTitle1Text, IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors.const';
import { Provider } from 'react-redux';

const IPayTitle1TextMeta: Meta<typeof IPayTitle1Text> = {
  title: 'components/text/ipay-title1-text/IPayTitle1Text',
  component: IPayTitle1Text,
  args: {
    text: 'Hello world',
    style: {
      color: colors.natural.natural1000,
      fontSize: SCALE_16,
      fontWeight: '500'
    }
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <IPayView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Story />
        </IPayView>
      </Provider>
    )
  ]
};

export default IPayTitle1TextMeta;

export const Basic: StoryObj<typeof IPayTitle1Text> = {};

export const Ttile1Regular: StoryObj<typeof IPayTitle1Text> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.natural.natural1000,
      fontSize: SCALE_28,
      fontWeight: '400'
    }
  }
};

export const Title1Bold: StoryObj<typeof IPayTitle1Text> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.natural.natural1000,
      fontSize: SCALE_28,
      fontWeight: '700'
    }
  }
};
