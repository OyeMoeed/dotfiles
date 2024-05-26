import { RNView } from '@app/components/atoms';
import { store } from '@app/store/store';
import { alertType, alertVariant } from '@app/utilities/enums';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import IpayAlert from './ipay-alert.component';

const IPayAlertMeta: Meta<typeof IpayAlert> = {
  title: 'Components/Alerts/IpayAlert',
  component: IpayAlert,
  args: {
    testID: 'default-alert',
    variant: alertVariant.DEFAULT,
    type: alertType.DEFAULT,
    title: 'Alert Title',
    message: 'This is an alert message',
    visible: true,
    onClose: () => console.log('Alert closed')
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

export default IPayAlertMeta;

export const Basic: StoryObj<typeof IpayAlert> = {};

export const DefaultAlert: StoryObj<typeof IpayAlert> = {
  args: {
    variant: alertVariant.DEFAULT,
    type: alertType.DEFAULT,
    primaryAction: {
      text: 'OK',
      onPress: () => console.log('Primary action pressed')
    }
  }
};

export const DestructiveAlert: StoryObj<typeof IpayAlert> = {
  args: {
    variant: alertVariant.DESTRUCTIVE,
    type: alertType.DEFAULT,
    primaryAction: {
      text: 'Delete',
      onPress: () => console.log('Destructive action pressed')
    }
  }
};

export const SideBySideAlert: StoryObj<typeof IpayAlert> = {
  args: {
    variant: alertVariant.DEFAULT,
    type: alertType.SIDE_BY_SIDE,
    primaryAction: {
      text: 'Confirm',
      onPress: () => console.log('Confirm action pressed')
    },
    secondaryAction: {
      text: 'Cancel',
      onPress: () => console.log('Cancel action pressed')
    }
  }
};
