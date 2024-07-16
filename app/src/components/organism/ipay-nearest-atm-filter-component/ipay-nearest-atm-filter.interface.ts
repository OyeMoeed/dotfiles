import { ViewStyle } from 'react-native';

export interface ipayNearestAtmTabCompoenetProps {
  testID?: string;
  style?: ViewStyle;
  headingText: string;
  subHeadlinText?: string;
  onPressDropdown: () => void;
  nearestAtmFilters: string[];
  onSelectTab: (tab: string) => void;
  selectedTab?: string;
}
