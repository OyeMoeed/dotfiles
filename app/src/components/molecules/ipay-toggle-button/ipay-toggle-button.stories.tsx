import { store } from '@app/store/store';
import { IPayView } from '@components/atoms';
import { IPayToggleButton } from '@components/molecules';
import type { Meta, StoryObj } from '@storybook/react';
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

export const Basic: StoryObj<typeof IPayToggleButton> = {
  args: {
    toggleState: true,
    disabled: false,
  },
};

export const Checked: StoryObj<typeof IPayToggleButton> = {
  args: {
    disabled: false,
    toggleState: true,
  },
};

export const UnChecked: StoryObj<typeof IPayToggleButton> = {
  args: {
    disabled: false,
    toggleState: false,
  },
};

export const EnabledChecked: StoryObj<typeof IPayToggleButton> = {
  args: {
    disabled: false,
    toggleState: true,
  },
};

export const DisabledChecked: StoryObj<typeof IPayToggleButton> = {
  args: {
    disabled: true,
    toggleState: true,
  },
};

export const EnabledUnChecked: StoryObj<typeof IPayToggleButton> = {
  args: {
    disabled: false,
    toggleState: false,
  },
};
export const DisabledUnChecked: StoryObj<typeof IPayToggleButton> = {
  args: {
    disabled: true,
    toggleState: false,
  },
};
