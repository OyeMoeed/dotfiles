import { IPayIcon, IPayView } from '@app/components/atoms';
import { store } from '@app/store/store';
import colors from '@app/styles/colors.const';
import type { Meta, StoryObj } from '@storybook/react';
import { scale } from 'react-native-size-matters';
import { Provider } from 'react-redux';
import IPayActionSheet from './ipay-actionsheet.component';

const IPayActionSheetMeta: Meta<typeof IPayActionSheet> = {
  title: 'components/sheet/Action Sheet',
  component: IPayActionSheet,
  args: {
    testID: 'ipay-action-sheet',
    title: 'Action Sheet Title',
    message: 'This is a message for the action sheet.',
    options: ['Option 1', 'Option 2', 'Cancel'],
    cancelButtonIndex: 2,
    destructiveButtonIndex: 1,
    showIcon: true,
    showCancel: true,
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

export default IPayActionSheetMeta;

export const Basic: StoryObj<typeof IPayActionSheet> = {};

export const WithCustomColors: StoryObj<typeof IPayActionSheet> = {
  args: {
    title: 'Custom Title',
    message: 'Custom message',
    options: ['Custom Option 1', 'Custom Option 2', 'Cancel'],
    headingStyles: {
      color: colors.yellowPalette.yellow800,
    },
  },
};

export const WithCustomImage: StoryObj<typeof IPayActionSheet> = {
  args: {
    customImage: <IPayIcon icon={icons.ARROW_RIGHT} size={18} color={colors.lightColorPalette.white} />, // replace with actual custom image component
    options: ['Option 1', 'Option 2', 'Cancel'],
  },
};

export const WithoutCancelButton: StoryObj<typeof IPayActionSheet> = {
  args: {
    showCancel: false,
    options: ['Option 1', 'Option 2'],
  },
};