import { ViewStyle } from 'react-native';

export interface ipayNearestAtmTabCompoenetProps {
  testID?: string;
  style?: ViewStyle;
  headingText: string;
  subHeadlinText?: string;
  onPressDropdown: () => void;
  nearestAtmFilters: string[];
  onSelectTab: (arg0: string) => void;
  selectedTab?: string;
}
