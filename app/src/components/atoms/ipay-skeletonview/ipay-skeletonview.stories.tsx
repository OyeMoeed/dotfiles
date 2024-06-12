import { store } from '@app/store/store';
import { SCALE_16, SCALE_18 } from '@app/styles/spacing.const';
import { IPayText, IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors.const';
import { Provider } from 'react-redux';
import IPaySkeletonView from './ipay-skeletonview.component';

const IPaySkeletonViewMeta: Meta<typeof IPaySkeletonView> = {
  title: 'components/loaders/IPaySkeletonView',
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
