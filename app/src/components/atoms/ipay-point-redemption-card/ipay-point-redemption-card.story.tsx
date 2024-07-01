import { Meta, Story } from '@storybook/react-native';
import IPayPointRedemptionCard from './ipay-point-redemption-card.component';
import { IPayPointRedemptionCardProps } from './ipay-point-redemption-card.interface';

export default {
  title: 'IPayPointRedemptionCard',
  component: IPayPointRedemptionCard,
  parameters: {
    docs: {
      description: {
        component:
          'A component that displays a point redemption card with a gradient background and points information.',
      },
    },
  },
  argTypes: {
    points: {
      control: 'text',
      description: 'The number of points to display on the card.',
      defaultValue: '2400',
    },
    containerStyle: {
      control: 'object',
      description: 'Style for the container of the card.',
    },
    pointsStyle: {
      control: 'object',
      description: 'Style for the points text.',
    },
    headerStyle: {
      control: 'object',
      description: 'Style for the header section.',
    },
    backgroundImageStyle: {
      control: 'object',
      description: 'Style for the background image.',
    },
  },
} as Meta;

const Template: Story<IPayPointRedemptionCardProps> = (args) => <IPayPointRedemptionCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  points: '2400',
};

export const CustomStyles = Template.bind({});
CustomStyles.args = {
  points: '3000',
  containerStyle: {
    padding: 20,
  },
  pointsStyle: {
    fontSize: 24,
  },
  headerStyle: {
    justifyContent: 'center',
  },
  backgroundImageStyle: {
    opacity: 0.8,
  },
};

// Additional stories to demonstrate different variations
export const NoPoints = Template.bind({});
NoPoints.args = {
  points: '',
};

export const LargePoints = Template.bind({});
LargePoints.args = {
  points: '10000',
};
