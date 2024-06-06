import React from 'react';
import { Story, Meta } from '@storybook/react';
import IPayIcon from './ipay-icon.component';

export default {
  title: 'IPayIcon',
  component: IPayIcon,
  parameters: {
    docs: {
      description: {
        component: 'A component that renders an icon using Svg and Path components from react-native-svg.',
      },
    },
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'The name of the icon to render.',
    },
    size: {
      control: 'number',
      description: 'The size of the icon.',
    },
    disableFill: {
      control: 'boolean',
      description: 'If true, disables the default fill color.',
    },
    removeInlineStyle: {
      control: 'boolean',
      description: 'If true, removes the default inline styles applied to the SVG.',
    },
  },
} as Meta;

const Template: Story = (args) => <IPayIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: 'received',
  size: 30,
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  icon: 'dislike1',
  size: 50,
};

export const NoFill = Template.bind({});
NoFill.args = {
  icon: 'flag1',
  disableFill: true,
};

export const RemoveInlineStyle = Template.bind({});
RemoveInlineStyle.args = {
  icon: 'sample-icon',
  removeInlineStyle: true,
};
