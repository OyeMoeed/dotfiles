import { IPayView } from '@app/components/atoms';
import { store } from '@app/store/store';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import IPayCheckbox from './ipay-checkbox.component';

const IPayCheckboxMeta: Meta<typeof IPayCheckbox> = {
  title: 'components/display/IPayCheckbox',
  component: IPayCheckbox,
  args: {
    testID: 'default-checkbox',
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

export default IPayCheckboxMeta;

export const Basic: StoryObj<typeof IPayCheckbox> = {};

export const SelectedCheckbox: StoryObj<typeof IPayCheckbox> = {
  args: {
    isCheck: true,
  },
};

export const UnSelectedCheckox: StoryObj<typeof IPayCheckbox> = {
  args: {
    isCheck: false,
  },
};
