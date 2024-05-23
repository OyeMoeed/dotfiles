import { store } from '@app/store/store';
import { IPayView } from '@app/components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@app/styles/colors.styles';
import React from 'react';
import IPayActionSheet from './ipay-actionsheet.component';
import { ArrowRight } from '@app/assets/svgs';

const IPayActionSheetMeta: Meta<typeof IPayActionSheet> = {
  title: 'Components/Sheet/Action Sheet',
  component: IPayActionSheet,
  args: {
    testID: 'ipay-action-sheet',
    title: 'Action Sheet Title',
    message: 'This is a message for the action sheet.',
    options: ['Option 1', 'Option 2', 'Cancel'],
    cancelButtonIndex: 2,
    destructiveButtonIndex: 1,
    showIcon: true,
    showCancel: true
  },
  decorators: [
    (Story) => (
      <IPayView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </IPayView>
    )
  ]
};

export default IPayActionSheetMeta;

export const Basic: StoryObj<typeof IPayActionSheet> = {};

export const WithCustomColors: StoryObj<typeof IPayActionSheet> = {
  args: {
    title: 'Custom Title',
    message: 'Custom message',
    options: ['Custom Option 1', 'Custom Option 2', 'Cancel'],
    headingStyles: {
      color: colors.yellow800
    }
  }
};

export const WithCustomImage: StoryObj<typeof IPayActionSheet> = {
  args: {
    customImage: <ArrowRight />, // replace with actual custom image component
    options: ['Option 1', 'Option 2', 'Cancel']
  }
};

export const WithoutCancelButton: StoryObj<typeof IPayActionSheet> = {
  args: {
    showCancel: false,
    options: ['Option 1', 'Option 2']
  }
};
