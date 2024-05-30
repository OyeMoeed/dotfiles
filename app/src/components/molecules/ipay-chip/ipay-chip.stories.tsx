import { store } from '@app/store/store';
import { IPayView } from '@components/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import colors from '@styles/colors.const';
import { Provider } from 'react-redux';
import IPayChip from './ipay-chip.component';

const IPayChipMeta: Meta<typeof IPayChip> = {
  title: 'components/chip/IPayChip',
  component: IPayChip,
  args: {
    textValue: 'Text',
    headingStyles: {
      color: colors.secondary.secondary500,
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

export default IPayChipMeta;

export const Basic: StoryObj<typeof IPayChip> = {};

export const Chip: StoryObj<typeof IPayChip> = {
  args: {
    textValue: 'Hello ',
    headingStyles: {
      color: colors.yellowPalette.yellow800,
    },
  },
};

export const Chip2: StoryObj<typeof IPayChip> = {
  args: {
    textValue: 'Hello ',
    headingStyles: {
      color: colors.tertiary.tertiary500,
    },
  },
};
export const Chip3: StoryObj<typeof IPayChip> = {
  args: {
    textValue: 'Hello ',
    headingStyles: {
      color: colors.natural.natural700,
    },
  },
};
