import { store } from '@app/store/store';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import IPayView from '../view/ipay-view.component';
import IpayProgressBar from './ipay-progressbar.component';

const IpayProgressBarMeta: Meta<typeof IpayProgressBar> = {
  title: 'components/loaders/IpayProgressBar',
  component: IpayProgressBar,
  args: {
    colors: ['#42a5f5', '#478ed1']
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

export default IpayProgressBarMeta;

export const Basic: StoryObj<typeof IpayProgressBar> = {};

export const CustomColors: StoryObj<typeof IpayProgressBar> = {
  args: {
    colors: ['#42a5f5', '#478ed1']
  }
};
