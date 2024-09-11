import { store } from '@app/store/store';
import { FallbackVariants } from '@app/utilities/enums.util';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import IPayView from '../ipay-view/ipay-view.component';
import IPayFallbackImg from './ipay-fallbackimg.component';

const IPayFallbackImgMeta: Meta<typeof IPayFallbackImg> = {
  title: 'components/fallbackImages/IPayFallbackImg',
  component: IPayFallbackImg,
  args: {
    variant: FallbackVariants.LOGO, // Default args
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

export default IPayFallbackImgMeta;
export const LogoVariant: StoryObj<typeof IPayFallbackImg> = {
  args: {
    variant: FallbackVariants.LOGO,
  },
};

export const LoaderVariant: StoryObj<typeof IPayFallbackImg> = {
  args: {
    variant: FallbackVariants.LOADER,
  },
};

export const ImageVariant: StoryObj<typeof IPayFallbackImg> = {
  args: {
    variant: FallbackVariants.IMAGE,
  },
};
