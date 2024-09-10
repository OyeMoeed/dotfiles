import { IPayView } from '@app/components/atoms';
import colors from '@app/styles/colors.const';
import { TabBase } from '@app/utilities/enums.util';
import type { Meta, StoryObj } from '@storybook/react';
import IPayTabs from './ipay-tabs.component';

const IPayTabsMeta: Meta<typeof IPayTabs> = {
  title: 'components/tabs/IPayTabs',
  component: IPayTabs,
  args: {
    tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
    scrollable: false,
    variant: TabBase.Natural,
    customStyles: {
      backgroundColor: colors.primary.primary100,
    },
  },
  decorators: [
    (Story) => (
      <IPayView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </IPayView>
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
