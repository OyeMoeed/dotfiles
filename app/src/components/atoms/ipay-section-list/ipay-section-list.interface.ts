import React from 'react';
import { DefaultSectionT, SectionListData, SectionListRenderItem, StyleProp, ViewStyle } from 'react-native';

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
  renderSectionHeader?: (info: { section: SectionListData<Section, DefaultSectionT> }) => React.ReactElement;
  itemSeparatorStyle?: StyleProp<ViewStyle>;
}

export default IPaySectionListProps;
