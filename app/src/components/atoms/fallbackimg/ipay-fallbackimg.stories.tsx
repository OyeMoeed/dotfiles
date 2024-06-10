import { store } from '@app/store/store';
import { fallbackVariants } from '@app/utilities/enums.util';
import { IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
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
        <IPayView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Story />
        </IPayView>
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
