import { IPayView } from '@app/components/atoms';
import { store } from '@app/store/store';
import { variants } from '@app/utilities/enums';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import IPayBanner from './ipay-banner.component';

const IPayBannerMeta: Meta<typeof IPayBanner> = {
  title: 'Components/Display/RNBanner',
  component: IPayBanner,
  args: {
    testID: 'default-banner',
    text: 'Default Text'
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

export default IPayBannerMeta;

export const Basic: StoryObj<typeof IPayBanner> = {};

export const PrimaryBanner: StoryObj<typeof IPayBanner> = {
  args: {
    text: 'Primary Banner',
    variant: variants.NATURAL
  }
};

export const SecondaryBanner: StoryObj<typeof IPayBanner> = {
  args: {
    text: 'Secondary Banner',
    variant: variants.COLORED
  }
};
