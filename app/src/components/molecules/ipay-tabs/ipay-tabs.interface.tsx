// ipay-tabs.interface.ts

import { StyleProp, TextStyle, ViewStyle } from 'react-native';

// Import the TabBase enum from utilities/enums
import { TabBase } from '@app/utilities/enums.util';

// Define a type alias for individual tabs
export type Tab = string;

// Define the interface for the props that the IPayTabs component accepts
export interface IPayTabsProps {
  // An array of strings representing the tabs to be displayed
  tabs: Tab[];

  // An optional callback function called when a tab is selected
  onSelect?: () => void;

  // An optional boolean indicating whether the tabs should be scrollable horizontally
  scrollable?: boolean;

  // An optional enum representing the variant of the tabs
  variant?: TabBase;

  // An optional style prop allowing custom styles to be applied to the component
  customStyles?: StyleProp<ViewStyle>;
}

export interface IPayTabsStyles {
  selectedTab: ViewStyle;
  unSelectedTab: ViewStyle;
  selected: TextStyle;
  unselected: TextStyle;
  container: ViewStyle;
  scrollContainer: ViewStyle;
  tab: ViewStyle;
  flexTab: ViewStyle;
}
