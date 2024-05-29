import { store } from '@app/store/store';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import IPayTitleAssistive from './ipay-title-assistive.component';

export default {
  title: 'components/text/IPayTitleAssistive',
  component: IPayTitleAssistive,
} as Meta;

const Template: Story = (args) => (
  <Provider store={store}>
    <IPayTitleAssistive {...args} />
  </Provider>
);

export const Default = Template.bind({});
Default.args = {
  heading: 'Title',
  text: 'This is some text.',
};
