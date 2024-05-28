import { store } from '@app/store/store';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors';
import { SCALE_16, SCALE_18 } from '@styles/spacing';
import { Provider } from 'react-redux';
import IPaySkeletonView from '../IPaySkeletonView';
import IPayView from '../view/ipay-view.component';
import IPayText from '../text/ipay-base-text/ipay-text.component';

const IPaySkeletonViewMeta: Meta<typeof IPaySkeletonView> = {
  title: 'components/skeleton/IPaySkeletonView',
  component: IPaySkeletonView,
  args: {
    isLoading: true,
    containerStyle: {
      width: 300,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
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

export default IPaySkeletonViewMeta;

export const Basic: StoryObj<typeof IPaySkeletonView> = {
  args: {
    children: (
      <>
        <IPayText style={{ fontSize: SCALE_16, color: colors.black }}>Your content</IPayText>
        <IPayText style={{ fontSize: SCALE_18, fontWeight: 'bold', color: colors.black }}>Other content</IPayText>
      </>
    ),
  },
};

export const Loading: StoryObj<typeof IPaySkeletonView> = {
  args: {
    isLoading: true,
    children: <IPayText style={{ fontSize: SCALE_16, color: colors.black }}>Loading content</IPayText>,
  },
};

export const NotLoading: StoryObj<typeof IPaySkeletonView> = {
  args: {
    isLoading: false,
    children: (
      <>
        <IPayText style={{ fontSize: SCALE_16, color: colors.black }}>Your content</IPayText>
        <IPayText style={{ fontSize: SCALE_18, fontWeight: 'bold', color: colors.black }}>Other content</IPayText>
      </>
    ),
  },
};
