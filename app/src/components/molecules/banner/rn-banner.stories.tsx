import React from 'react';
import { RNView } from '@app/components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '@app/store/store';
import RNBanner from './rn-banner.component';
import { variants } from '@app/utilities/enums';

const RNBannerMeta: Meta<typeof RNBanner> = {
  title: 'Components/Display/RNBanner',
  component: RNBanner,
  args: {
    testID: 'default-banner',
    text: 'Default Text'
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <RNView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Story />
        </RNView>
      </Provider>
    )
  ]
};

export default RNBannerMeta;

export const Basic: StoryObj<typeof RNBanner> = {};

export const PrimaryBanner: StoryObj<typeof RNBanner> = {
  args: {
    text: 'Primary Banner',
    variant: variants.NATURAL
  }
};

export const SecondaryBanner: StoryObj<typeof RNBanner> = {
  args: {
    text: 'Secondary Banner',
    variant: variants.COLORED
  }
};
