import images from '@app/assets/images'; // Adjust import path as per your project structure
import { store } from '@app/store/store'; // Adjust import path as per your project structure
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import IPayText from '../ipay-text/ipay-base-text/ipay-text.component';
import IPayImageBackground from './ipay-image-background.component';
import { IPayImageBackgroundProps } from './ipay-image-background.interface';

export default {
  title: 'components/display/IPayImageBackground',
  component: IPayImageBackground,
} as Meta;

// Define the template for the story
const Template: Story<IPayImageBackgroundProps> = ({ testID, image, style }) => (
  <Provider store={store}>
    <IPayImageBackground testID={testID} image={image} style={style}>
      {/* Optionally add children here if needed */}
      <IPayText text="Hello" />
    </IPayImageBackground>
  </Provider>
);

// Define different stories

export const LocalSource = Template.bind({});
LocalSource.args = {
  testID: 'local-source',
  image: require('@assets/images/short_hand_debit_card.png'), // Local image source
  style: {
    height: 200,
    width: 300,
    resizeMode: 'cover',
  },
};

export const RemoteSource = Template.bind({});
RemoteSource.args = {
  testID: 'remote-source',
  image: images.profile, // Remote image source
  style: {
    height: 300,
    width: 200,
    resizeMode: 'contain',
  },
};
