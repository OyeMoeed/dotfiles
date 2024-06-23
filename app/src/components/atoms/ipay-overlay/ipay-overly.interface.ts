import { ViewStyle } from 'react-native';

export interface IPayOverlayProps {
  testID?: string; // Define testID prop as optional string
  onPress?: () => void;
  style?: ViewStyle;
}
