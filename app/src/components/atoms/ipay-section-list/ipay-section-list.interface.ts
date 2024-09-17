import React from 'react';
import { SectionListRenderItem, StyleProp, ViewStyle } from 'react-native';

interface Section {
  id: string | number;
  title: string;
  data: any[];
}

interface IPaySectionListProps {
  testID?: string;
  data: Section[];
  style?: ViewStyle;
  refreshControl?: React.ReactElement;
  showsVerticalScrollIndicator?: boolean;
  renderItem: SectionListRenderItem<any>;
  renderSectionHeader: (info: { section: Section }) => React.ReactNode;
  itemSeparatorStyle?: StyleProp<ViewStyle>;
}

export default IPaySectionListProps;
