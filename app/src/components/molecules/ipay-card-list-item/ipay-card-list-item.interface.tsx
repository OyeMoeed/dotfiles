import { ViewStyle, StyleProp } from 'react-native';

export interface IPayCardListItemProps {
  testID?: string;
  headerText: string;
  lastFourDigit: string;
  cardIcon: string;
  onPressMore?: () => void;
  hideMore?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}
