import { store } from '@app/store/store';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import IPayView from '../ipay-view/ipay-view.component';
import IPayProgressBar from './ipay-progressbar.component';

const IpayProgressBarMeta: Meta<typeof IPayProgressBar> = {
  title: 'components/loaders/IPayProgressBar',
  component: IPayProgressBar,
  args: {
    colors: ['#42a5f5', '#478ed1'],
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

export default IpayProgressBarMeta;

export const Basic: StoryObj<typeof IPayProgressBar> = {};

export const CustomColors: StoryObj<typeof IPayProgressBar> = {
  args: {
    colors: ['#42a5f5', '#478ed1'],
  },
};
