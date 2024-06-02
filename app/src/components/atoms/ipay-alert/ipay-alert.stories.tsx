import { IPayView } from '@app/components/atoms';
import { store } from '@app/store/store';
import { alertType, alertVariant } from '@app/utilities/enums.util';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import IPayAlert from './ipay-alert.component';

const IPayAlertMeta: Meta<typeof IPayAlert> = {
  title: 'components/alerts/IPayAlert',
  component: IPayAlert,
  args: {
    testID: 'default-alert',
    variant: alertVariant.DEFAULT,
    type: alertType.DEFAULT,
    title: 'Alert Title',
    message: 'This is an alert message',
    visible: true,
    onClose: () => {},
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

export default IPayAlertMeta;

export const Basic: StoryObj<typeof IPayAlert> = {};

export const DefaultAlert: StoryObj<typeof IPayAlert> = {
  args: {
    variant: alertVariant.DEFAULT,
    type: alertType.DEFAULT,
    primaryAction: {
      text: 'OK',
      onPress: () => {},
    },
  },
};

export const DestructiveAlert: StoryObj<typeof IPayAlert> = {
  args: {
    variant: alertVariant.DESTRUCTIVE,
    type: alertType.DEFAULT,
    primaryAction: {
      text: 'Delete',
      onPress: () => {},
    },
  },
};

export const SideBySideAlert: StoryObj<typeof IPayAlert> = {
  args: {
    variant: alertVariant.DEFAULT,
    type: alertType.SIDE_BY_SIDE,
    primaryAction: {
      text: 'Confirm',
      onPress: () => {},
    },
    secondaryAction: {
      text: 'Cancel',
      onPress: () => {},
    },
  },
};
