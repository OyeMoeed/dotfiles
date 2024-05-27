import React from 'react';
import { Story, Meta } from '@storybook/react';
import IPayImage from './ipay-image.component';

export default {
  title: 'Components/Display/IPayImage',
  component: IPayImage
} as Meta;

const Template: Story = (args) => <IPayImage {...args} />;

export const LocalSource = Template.bind({});
LocalSource.args = {
  testID: 'local-source',
  image: require('./path/to/local/image.png')
};

export const RemoteSource = Template.bind({});
RemoteSource.args = {
  testID: 'remote-source',
  image: 'https://example.com/image.jpg'
};
