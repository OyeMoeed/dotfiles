import { store } from '@app/store/store';
import { SCALE_13, SCALE_16 } from '@app/styles/spacing.const';
import { IPayFootnoteText, IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors.const';
import { Provider } from 'react-redux';

const IPayFootnoteTextMeta: Meta<typeof IPayFootnoteText> = {
  title: 'components/text/ipay-footnote-text/IPayText',
  component: IPayFootnoteText,
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

export default IPayFootnoteTextMeta;

export const Basic: StoryObj<typeof IPayFootnoteText> = {};

export const FootnoteRegular: StoryObj<typeof IPayFootnoteText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.natural.natural1000,
      fontSize: SCALE_13,
      fontWeight: '400'
    }
  }
};

export const FootnoteBold: StoryObj<typeof IPayFootnoteText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.natural.natural1000,
      fontSize: SCALE_13,
      fontWeight: '700'
    }
  }
};
