import { IPayView } from '@app/components/atoms';
import { store } from '@app/store/store';
import { SpinnerVariant } from '@app/utilities/enums.util';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import IPaySpinner from './ipay-spinner-component';

const IPaySpinnerMeta: Meta<typeof IPaySpinner> = {
  title: 'components/loaders/IPaySpinner',
  component: IPaySpinner,
  args: {
    testID: 'default-banner',
    text: 'Loading ...',
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

export default IPaySpinnerMeta;

export const Basic: StoryObj<typeof IPaySpinner> = {};

export const DefaultSpinner: StoryObj<typeof IPaySpinner> = {
  args: {
    variant: SpinnerVariant.DEFAULT,
  },
};

export const SpinnerWithText: StoryObj<typeof IPaySpinner> = {
  args: {
    variant: SpinnerVariant.TEXT,
  },
};
