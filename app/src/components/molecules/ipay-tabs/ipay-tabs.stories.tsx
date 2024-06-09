import { IPayView } from '@app/components/atoms';
import { store } from '@app/store/store';
import colors from '@app/styles/colors.const';
import { TabBase } from '@app/utilities/enums.util';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import IPayTabs from './ipay-tabs.component';

const IPayTabsMeta: Meta<typeof IPayTabs> = {
  title: 'components/tabs/IPayTabs',
  component: IPayTabs,
  args: {
    tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
    onSelect,
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
    variant: TabBase.Natural,
  },
};

export const VariantSecondary: StoryObj<typeof IPayTabs> = {
  args: {
    variant: TabBase.Colored,
  },
};
