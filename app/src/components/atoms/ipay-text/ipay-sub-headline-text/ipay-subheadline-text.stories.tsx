import { store } from '@app/store/store';
import { SCALE_14, SCALE_16 } from '@app/styles/spacing.const';
import { IPaySubHeadlineText, IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors.const';
import { Provider } from 'react-redux';

const IPaySubHeadlineTextMeta: Meta<typeof IPaySubHeadlineText> = {
  title: 'components/text/ipay-subheadline-text/IPaySubHeadlineText',
  component: IPaySubHeadlineText,
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

export default IPaySubHeadlineTextMeta;

export const Basic: StoryObj<typeof IPaySubHeadlineText> = {};

export const SubHeadlineRegular: StoryObj<typeof IPaySubHeadlineText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.natural.natural1000,
      fontSize: SCALE_14,
      fontWeight: '400'
    }
  }
};

export const SubHeadlineBold: StoryObj<typeof IPaySubHeadlineText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.natural.natural1000,
      fontSize: SCALE_14,
      fontWeight: '700'
    }
  }
};
