import { store } from '@app/store/store';
import { IPayText, IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors.const';
import { SCALE_16, SCALE_20 } from '@styles/spacing.styles';
import React from 'react';
import { Provider } from 'react-redux';

const IPayTextMeta: Meta<typeof IPayText> = {
  title: 'components/text/rn-title3-text/IPayText',
  component: IPayText,
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
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

export default IPayTextMeta;

export const Basic: StoryObj<typeof IPayText> = {};

export const Ttile3Regular: StoryObj<typeof IPayText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_20,
      fontWeight: '400'
    }
  }
};

export const Title3Bold: StoryObj<typeof IPayText> = {
  args: {
    text: 'Hello world',
    style: {
      color: colors.black,
      fontSize: SCALE_20,
      fontWeight: '700'
    }
  }
};
