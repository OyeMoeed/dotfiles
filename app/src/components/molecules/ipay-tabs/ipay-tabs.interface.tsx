// ipay-tabs.interface.ts

import { TabBase } from '@app/utilities/enums.util';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

// Import the TabBase enum from utilities/enums

// Define a type alias for individual tabs
export type Tab = string;

// Define a type alias for individual tabsWithImage
export type TabsIconProp = {
  text: string;
  image?: string;
};

// Define the interface for the props that the IPayTabs component accepts
export interface IPayTabsProps {
  // An array of strings representing the tabs to be displayed
  tabs?: Tab[];
  // An array of strings representing the tabs to be displayed

  // An optional callback function called when a tab is selected
  onSelect?: (arg0: string) => void;
  // An optional callback function called when a tab is selected

  // An optional boolean indicating whether the tabs should be scrollable horizontally
  scrollable?: boolean;
  // An optional boolean indicating whether the tabs should be scrollable horizontally

  // An optional enum representing the variant of the tabs
  variant?: TabBase;

  // An optional style prop allowing custom styles to be applied to the component
  customStyles?: StyleProp<ViewStyle>;
  testID?: string;
  scrollEnabled?: boolean;
  preSelectedTab?: string;
  tabsIcon?: TabsIconProp[];
  imageStyle?: StyleProp<ImageStyle>;
}

export interface IPayTabsStyles {
  listWrapper: StyleProp<ViewStyle>;
  imageStyle: StyleProp<ImageStyle>;
  selectedTab: ViewStyle;
  unSelectedTab: ViewStyle;
  selected: TextStyle;
  unselected: TextStyle;
  container: ViewStyle;
  scrollContainer: ViewStyle;
  tab: ViewStyle;
  flexTab: ViewStyle;
}
