import colors from '@app/styles/colors.const';
import { Meta, Story } from '@storybook/react';
import IPayLinearGradientView from './ipay-linear-gradient.component';

export default {
  title: 'Components/Input/IPayTextInput',
  component: IPayTextInput,
} as Meta;

const Template: Story = (args) => {
  const [text, setText] = useState('');
  return <IPayTextInput {...args} text={text} onChangeText={setText} />;
};

export const Default = Template.bind({});
Default.args = {
  testID: 'default-textinput',
  placeholder: 'Enter text...',
};

export const WithText = Template.bind({});
WithText.args = {
  testID: 'with-text',
  text: 'Predefined text',
  placeholder: 'Enter text...',
};

export const Multiline = Template.bind({});
Multiline.args = {
  testID: 'multiline-textinput',
  placeholder: 'Enter text...',
  multiline: true,
  numberOfLines: 4,
};
