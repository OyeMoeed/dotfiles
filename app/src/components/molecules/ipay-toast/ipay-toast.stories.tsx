import { IPayView } from '@app/components/atoms';
import { store } from '@app/store/store';
import { Meta, StoryObj } from '@storybook/react-native';
import { Provider } from 'react-redux';
import { ToastProvider } from './context/ipay-toast-context';
import IPayToast from './ipay-toast.component';

const IPayToastMeta: Meta<typeof IPayToast> = {
  title: 'components/notifications/IPayToast',
  component: IPayToast,
  args: {
    testID: 'default-toast',
    title: 'This is a toast message',
    subTitle: 'This is a subtitle',
    isShowLeftIcon: true,
    isShowSubTitle: true,
    isShowRightIcon: true
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ToastProvider>
          <IPayView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Story />
          </IPayView>
        </ToastProvider>
      </Provider>
    )
  ]
};

export default IPayToastMeta;

export const Basic: StoryObj<typeof IPayToast> = {};

export const WithLeftIcon: StoryObj<typeof IPayToast> = {
  args: {
    isShowLeftIcon: true
  }
};

export const WithoutLeftIcon: StoryObj<typeof IPayToast> = {
  args: {
    isShowLeftIcon: false
  }
};

export const WithSubtitle: StoryObj<typeof IPayToast> = {
  args: {
    subTitle: 'This is a subtitle',
    isShowSubTitle: true
  }
};

export const WithoutSubtitle: StoryObj<typeof IPayToast> = {
  args: {
    subTitle: '',
    isShowSubTitle: false
  }
};

export const WithRightIcon: StoryObj<typeof IPayToast> = {
  args: {
    isShowRightIcon: true
  }
};

export const WithoutRightIcon: StoryObj<typeof IPayToast> = {
  args: {
    isShowRightIcon: false
  }
};
