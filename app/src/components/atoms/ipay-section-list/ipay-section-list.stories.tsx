import { store } from '@app/store/store';
import { spacing } from '@app/styles/spacing.const';
import { IPayText, IPayView } from '@components/atoms';
import type { Meta, StoryFn } from '@storybook/react';
import { RefreshControl } from 'react-native';
import { Provider } from 'react-redux';
import IPaySectionList from './ipay-section-list.component';
import IPaySectionListProps from './ipay-section-list.interface';

// Sample data for testing
const sampleData = [
  {
    title: 'Section 1',
    data: [
      { id: 1, question: 'Question 1.1', answer: 'Answer 1.1' },
      { id: 2, question: 'Question 1.2', answer: 'Answer 1.2' },
    ],
  },
  {
    title: 'Section 2',
    data: [
      { id: 3, question: 'Question 2.1', answer: 'Answer 2.1' },
      { id: 4, question: 'Question 2.2', answer: 'Answer 2.2' },
    ],
  },
];

// Template for rendering items
const renderItem = ({ item }: any) => (
  <IPayView style={{ padding: spacing.SCALE_10 }}>
    <IPayText text={item.question} />
    <IPayText text={item.answer} />
  </IPayView>
);

// Template for rendering section headers
const renderSectionHeader = ({ section }: any) => (
  <IPayView style={{ padding: spacing.SCALE_10, backgroundColor: '#f0f0f0' }}>
    <IPayText text={section.title} />
  </IPayView>
);

// Default Template
const Template: StoryFn<IPaySectionListProps> = (args: IPaySectionListProps) => <IPaySectionList {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: sampleData,
  renderItem,
  renderSectionHeader,
};

// SectionList with RefreshControl
export const WithRefreshControl = Template.bind({});
WithRefreshControl.args = {
  data: sampleData,
  renderItem,
  renderSectionHeader,
  refreshControl: <RefreshControl refreshing={false} onRefresh={() => {}} />,
};

// SectionList with Custom Styles
export const CustomStyles = Template.bind({});
CustomStyles.args = {
  data: sampleData,
  renderItem,
  renderSectionHeader,
  style: { backgroundColor: '#e0f7fa' },
};

const IPaySectionListMeta: Meta<IPaySectionListProps> = {
  title: 'components/ipay-list/IPaySectionList',
  component: IPaySectionList,
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

export default IPaySectionListMeta;
