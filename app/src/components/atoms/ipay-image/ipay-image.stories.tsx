import images from '@app/assets/images';
import { store } from '@app/store/store';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import IPayImage from './ipay-image.component';

export default {
  title: 'components/display/IPayImage',
  component: IPayImage,
} as Meta;

const Template: Story = (args) => (
  <Provider store={store}>
    <IPayImage {...args} />
  </Provider>
);
export const LocalSource = Template.bind({});
LocalSource.args = {
  testID: 'local-source',
  image: require('../../../assets/images/logo.jpeg'),
  style: {
    height: 100,
    width: 100,
    resizeMode: 'center',
  },
};

export const RemoteSource = Template.bind({});
RemoteSource.args = {
  testID: 'remote-source',
  image: images.profile,
  style: {
    height: 100,
    width: 100,
    resizeMode: 'center',
  },
};
