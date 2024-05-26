import React from 'react';
import { RNView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import { fallbackVariants } from '@app/utilities/enums';
import { Provider } from 'react-redux';
import { store } from '@app/store/store';
import IPayFallbackImg from './ipay-fallbackimg.component';

const IPayFallbackImgMeta: Meta<typeof IPayFallbackImg> = {
  title: 'Components/Fallback Images/IPayFallbackImg',
  component: IPayFallbackImg,
  args: {
    variant: fallbackVariants.LOGO // Default args
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

export default IPayFallbackImgMeta;
export const LogoVariant: StoryObj<typeof IPayFallbackImg> = {
  args: {
    variant: fallbackVariants.LOGO
  }
};

export const LoaderVariant: StoryObj<typeof IPayFallbackImg> = {
  args: {
    variant: fallbackVariants.LOADER
  }
};

export const ImageVariant: StoryObj<typeof IPayFallbackImg> = {
  args: {
    variant: fallbackVariants.IMAGE
  }
};
