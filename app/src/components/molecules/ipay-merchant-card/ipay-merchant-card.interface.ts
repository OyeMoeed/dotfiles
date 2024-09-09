import { ViewStyle } from 'react-native';

export interface MerchantItem {
  [key: string]: string;
}

export interface IPayMerchantCardProps {
  testID?: string;
  item: MerchantItem;
  containerStyle?: ViewStyle;
}
