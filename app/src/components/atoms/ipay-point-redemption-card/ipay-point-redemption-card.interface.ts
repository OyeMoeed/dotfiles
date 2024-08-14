import { StyleProp, ViewStyle } from 'react-native';

export interface IPayPointRedemptionCardProps {
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
  pointsStyle?: StyleProp<ViewStyle>;
  points?: number | string;
  amount?: number | string;
  headerStyle?: StyleProp<ViewStyle>;
  backgroundImageStyle?: StyleProp<ViewStyle>;
  innerContainerStyle?: StyleProp<ViewStyle>;
}
