// IpayGradientIcon.stories.tsx
import { IPayView } from '@app/components/atoms';
import { Meta, StoryObj } from '@storybook/react';
import IPayGradientIcon from './ipay-gradient-icon.component'; // Adjust the import path as needed

// Define the meta configuration for the component
const IpayGradientIconMeta: Meta<typeof IPayGradientIcon> = {
  title: 'components/icons/IpayGradientIcon',
  component: IPayGradientIcon,
  argTypes: {
    icon: { control: 'text' }, // Allow the icon prop to be text-controlled in the storybook
    size: { control: 'number' }, // Allow the size prop to be a number input
    disableFill: { control: 'boolean' }, // Boolean control for disableFill prop
    removeInlineStyle: { control: 'boolean' }, // Boolean control for removeInlineStyle prop
    gradientStart: { control: 'object' }, // Control for gradient start position
    gradientEnd: { control: 'object' } // Control for gradient end position
  },
  args: {
    icon: 'info-circle', // Default icon to show in the story
    size: 25, // Default size for the icon
    disableFill: false, // Default for disableFill prop
    removeInlineStyle: false, // Default for removeInlineStyle prop
    gradientColors: ['#00BAFE', '#CAA7FF'], // Default gradient colors
    gradientStart: { x: 0.0, y: 1 }, // Default gradient start position
    gradientEnd: { x: 1, y: 1 }, // Default gradient end position
    gradientLocations: [0.0, 1.0] // Default gradient locations
  },
  decorators: [
    (Story) => (
      <IPayView style={{ flex: 1 }}>
        <Story />
      </IPayView>
    )
  ]
};

export default IpayGradientIconMeta;

// Define different stories for the component
export const Basic: StoryObj<typeof IPayGradientIcon> = {
  args: {
    icon: 'info-circle',
    size: 25,
    gradientColors: ['#00BAFE', '#CAA7FF']
  }
};

export const CustomSize: StoryObj<typeof IPayGradientIcon> = {
  args: {
    icon: 'info-circle',
    size: 50
  }
};

export const CustomGradient: StoryObj<typeof IPayGradientIcon> = {
  args: {
    icon: 'info-circle',
    gradientColors: ['#FF5733', '#FFBD33']
  }
};

export const NoInlineStyle: StoryObj<typeof IPayGradientIcon> = {
  args: {
    icon: 'info-circle',
    removeInlineStyle: true
  }
};

export const DisabledFill: StoryObj<typeof IPayGradientIcon> = {
  args: {
    icon: 'info-circle',
    disableFill: true
  }
};

export const CustomGradientPositions: StoryObj<typeof IPayGradientIcon> = {
  args: {
    icon: 'info-circle',
    gradientStart: { x: 0.0, y: 0.0 },
    gradientEnd: { x: 1.0, y: 1.0 }
  }
};
