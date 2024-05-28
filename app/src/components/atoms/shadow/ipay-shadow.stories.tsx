import { IPayView } from '@app/components/atoms';
import { store } from '@app/store/store';
import { variants } from '@app/utilities/enums.util';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import IPayShadow from './ipay-shadow.component';

const IPayShadowShadowMeta: Meta<typeof IPayShadow> = {
  title: 'Components/Display/RNShadow',
  component: IPayShadow,
  args: {
    testID: 'default-banner',
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

export default IPayShadowShadowMeta;

export const Basic: StoryObj<typeof IPayShadow> = {};

export const NormalShadow: StoryObj<typeof IPayShadow> = {
  args: {
    variant: variants.NORMAL,
  },
};

export const PrimaryShadow: StoryObj<typeof IPayShadow> = {
  args: {
    variant: variants.PRIMARY,
  },
};
export const SecondaryShadow: StoryObj<typeof IPayShadow> = {
  args: {
    variant: variants.SECONDARY,
  },
};
