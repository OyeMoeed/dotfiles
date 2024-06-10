import { IPayView } from '@app/components/atoms';
import { store } from '@app/store/store';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import IPayHeader from './ipay-header.component';

const IPayHeaderMeta: Meta<typeof IPayHeader> = {
  title: 'Components/Headers/IPayHeader',
  component: IPayHeader,
  args: {
    testID: 'default-header',
    title: 'Header Title',
    backHeader: true,
    isRight: true,
    isLeft: true,
    leftText: 'Back',
    rightText: 'Menu',
    onBackPress: () => console.log('Back pressed'),
    onPressLeft: () => console.log('Left pressed'),
    onPressRight: () => console.log('Right pressed'),
    onPress: () => console.log('Delink pressed')
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <IPayView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Story />
        </IPayView>
      </Provider>
    )
  ]
};

export default IPayHeaderMeta;

export const Basic: StoryObj<typeof IPayHeader> = {};

export const WithBackButton: StoryObj<typeof IPayHeader> = {
  args: {
    backHeader: true,
    onBackPress: () => console.log('Back pressed')
  }
};

export const WithCustomLeftRight: StoryObj<typeof IPayHeader> = {
  args: {
    isLeft: true,
    leftText: 'Left',
    onPressLeft: () => console.log('Left pressed'),
    isRight: true,
    rightText: 'Right',
    onPressRight: () => console.log('Right pressed')
  }
};

export const WithLanguageHeader: StoryObj<typeof IPayHeader> = {
  args: {
    languageHeader: true
  }
};

export const WithDelink: StoryObj<typeof IPayHeader> = {
  args: {
    isDelink: true,
    onPress: () => console.log('Delink pressed')
  }
};
