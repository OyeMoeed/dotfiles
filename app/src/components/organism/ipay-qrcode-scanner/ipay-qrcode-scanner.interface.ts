import { ViewStyle } from 'react-native-size-matters';

export interface IPayQRCodeScannerProps {
  testID?: string;
  style?: ViewStyle;
  onRead: (code: string) => void;
}
