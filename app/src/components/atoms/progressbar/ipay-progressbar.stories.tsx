import React from 'react';
import { Provider } from 'react-redux';
import type { Meta, StoryObj } from '@storybook/react';
import { store } from '@app/store/store';
import IpayProgressBar from './ipay-progressbar.component';
import RNView from '../view/rn-view.component';

const IpayProgressBarMeta: Meta<typeof IpayProgressBar> = {
  title: 'components/loaders/IpayProgressBar',
  component: IpayProgressBar,
  args: {
    colors: ['#42a5f5', '#478ed1']
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

export default IpayProgressBarMeta;

export const Basic: StoryObj<typeof IpayProgressBar> = {};

export const CustomColors: StoryObj<typeof IpayProgressBar> = {
  args: {
    colors: ['#42a5f5', '#478ed1']
  }
};
