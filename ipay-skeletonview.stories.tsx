import { store } from '@app/store/store';
import { RNText, RNView } from '@components/atoms';
import IPaySkeletonView from '../IPaySkeletonView';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors';
import { SCALE_18, SCALE_16 } from '@styles/spacing';
import React from 'react';
import { Provider } from 'react-redux';

const IPaySkeletonViewMeta: Meta<typeof IPaySkeletonView> = {
  title: 'components/skeleton/IPaySkeletonView',
  component: IPaySkeletonView,
  args: {
    isLoading: true,
    containerStyle: {
      width: 300,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    }
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

export default IPaySkeletonViewMeta;

export const Basic: StoryObj<typeof IPaySkeletonView> = {
  args: {
    children: (
      <>
        <RNText style={{ fontSize: SCALE_16, color: colors.black }}>Your content</RNText>
        <RNText style={{ fontSize: SCALE_18, fontWeight: 'bold', color: colors.black }}>Other content</RNText>
      </>
    )
  }
};

export const Loading: StoryObj<typeof IPaySkeletonView> = {
  args: {
    isLoading: true,
    children: (
      <>
        <RNText style={{ fontSize: SCALE_16, color: colors.black }}>Loading content</RNText>
      </>
    )
  }
};

export const NotLoading: StoryObj<typeof IPaySkeletonView> = {
  args: {
    isLoading: false,
    children: (
      <>
        <RNText style={{ fontSize: SCALE_16, color: colors.black }}>Your content</RNText>
        <RNText style={{ fontSize: SCALE_18, fontWeight: 'bold', color: colors.black }}>Other content</RNText>
      </>
    )
  }
};
