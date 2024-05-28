import { IPayView } from '@app/components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import { store } from '@app/store/store';
import { Provider } from 'react-redux';
import { TabBase } from '@app/utilities/enums';
import colors from '@app/styles/colors';
import IPayTabs from './ipay-tabs.component';

const IPayTabsMeta: Meta<typeof IPayTabs> = {
  title: 'Components/Tabs/IPayTabs',
  component: IPayTabs,
  args: {
    tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
    onSelect: () => console.log('Tab selected'),
    scrollable: false,
    variant: TabBase.Natural,
    customStyles: {
      backgroundColor: colors.primary.primary100,
    },
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

export default IPayTabsMeta;

export const Basic: StoryObj<typeof IPayTabs> = {};

export const Scrollable: StoryObj<typeof IPayTabs> = {
  args: {
    scrollable: true,
  },
};

export const WithCustomStyles: StoryObj<typeof IPayTabs> = {
  args: {
    customStyles: {
      backgroundColor: colors.secondary.secondary200,
    },
  },
};

export const VariantPrimary: StoryObj<typeof IPayTabs> = {
  args: {
    variant: TabBase.Primary,
  },
};

export const VariantSecondary: StoryObj<typeof IPayTabs> = {
  args: {
    variant: TabBase.Secondary,
  },
};
