import { store } from '@app/store/store';
import { SCALE_16, SCALE_18 } from '@app/styles/spacing.const';
import { IPayBodyText, IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors.const';
import { Provider } from 'react-redux';

const IPayBodyTextMeta: Meta<typeof IPayBodyText> = {
  title: 'components/text/ipay-body-text/IPayBodyText',
  component: IPayBodyText,
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

export default IPayBodyTextMeta;

export const Basic: StoryObj<typeof IPayBodyText> = {};

export const BodyRegular: StoryObj<typeof IPayBodyText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_18,
      fontWeight: '400',
    },
  },
};

export const BodyBold: StoryObj<typeof IPayBodyText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_18,
      fontWeight: '700',
    },
  },
};
