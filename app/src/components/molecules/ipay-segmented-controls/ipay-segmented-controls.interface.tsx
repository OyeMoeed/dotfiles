// ipay-tabs.interface.ts

import { StyleProp, ViewStyle } from 'react-native';

// Import the TabBase enum from utilities/enums

// Define a type alias for individual tabs
export type Tab = string;

// Define the interface for the props that the IPayTabs component accepts
export interface IPayTabsProps {
  testID?: string;
  // An array of strings representing the tabs to be displayed
  tabs: Tab[];
  // An array of strings representing the tabs to be displayed

  // An optional callback function called when a tab is selected
  onSelect?: (tab: string, index: number) => void;

  // An optional style prop allowing custom styles to be applied to the component
  customStyles?: StyleProp<ViewStyle>;
  selectedTab: string;
}
