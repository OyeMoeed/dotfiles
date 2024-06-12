// RNFlatlist.stories.tsx

import { store } from '@app/store/store';
import { spacing } from '@app/styles/spacing.const';
import { IPayFlatlist, IPayText, IPayView } from '@components/atoms';
import type { Meta, Story } from '@storybook/react';
import { RefreshControl } from 'react-native';
import { Provider } from 'react-redux';
import { IPayFlatlistProps } from './ipay-flatlist.interface';

// Sample data for testing
const sampleData = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' },
  { id: 5, name: 'Eve' },
];

// Template for rendering items

const renderItem = ({ item }: any) => <IPayText style={{ padding: spacing.SCALE_10 }} text={item.name} />;

// Default Template
const Template: Story<IPayFlatlistProps> = (args: IPayFlatlistProps) => <IPayFlatlist {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: sampleData,
  renderItem,
};

// Horizontal FlatList
export const Horizontal = Template.bind({});
Horizontal.args = {
  data: sampleData,
  renderItem,
  horizontal: true,
};

// FlatList with RefreshControl
export const WithRefreshControl = Template.bind({});
WithRefreshControl.args = {
  data: sampleData,
  renderItem,
  refreshControl: <RefreshControl refreshing={false} onRefresh={() => {}} />,
};

// FlatList with Multiple Columns
export const MultipleColumns = Template.bind({});
MultipleColumns.args = {
  data: sampleData,
  renderItem,
  numColumns: 2,
};

const IPayFlatlistMeta: Meta<IPayFlatlistProps> = {
  title: 'components/list/IPayFlatlist',
  component: IPayFlatlist,
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

export default IPayFlatlistMeta;
