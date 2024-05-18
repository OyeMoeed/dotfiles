// RNFlatlist.stories.tsx

import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { RNText, RNView, RNFlatlist } from '@components/atoms';
import { FlatListProps, RefreshControl, ViewStyle } from 'react-native';

interface RNFlatlistProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  style?: ViewStyle;
  renderItem: (item: T) => React.ReactElement<any>;
  refreshControl?: React.ReactElement;
  horizontal?: boolean;
  numColumns?: number;
}

// Sample data for testing
const sampleData = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' },
  { id: 5, name: 'Eve' }
];

// Template for rendering items
const renderItem = (item: any) => <RNText style={{ padding: 10 }} text={item.name} />;

// Default Template
const Template: Story<RNFlatlistProps<any>> = (args) => <RNFlatlist {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: sampleData,
  renderItem
};

// Horizontal FlatList
export const Horizontal = Template.bind({});
Horizontal.args = {
  data: sampleData,
  renderItem,
  horizontal: true
};

// FlatList with RefreshControl
export const WithRefreshControl = Template.bind({});
WithRefreshControl.args = {
  data: sampleData,
  renderItem,
  refreshControl: <RefreshControl refreshing={false} onRefresh={() => {}} />
};

// FlatList with Multiple Columns
export const MultipleColumns = Template.bind({});
MultipleColumns.args = {
  data: sampleData,
  renderItem,
  numColumns: 2
};

const RNFlatlistMeta: Meta<RNFlatlistProps<any>> = {
  title: 'components/list/RNFlatlist',
  component: RNFlatlist,
  decorators: [
    (Story) => (
      <RNView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </RNView>
    )
  ]
};

export default RNFlatlistMeta;
