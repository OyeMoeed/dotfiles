import { store } from '@app/store/store';
import { IPayView } from '@components/atoms';
import { IPayToggleButton } from '@components/molecules';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';

const IPayToggleButtonMeta: Meta<typeof IPayToggleButton> = {
  title: 'components/buttons/IPayToggleButton',
  component: IPayToggleButton,
  argTypes: {
    onToggleChange: { action: 'pressed the button' },
  },
  args: {},
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

export default IPayToggleButtonMeta;

export const Basic: StoryObj<typeof IPayToggleButton> = {};
