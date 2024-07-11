import { StyleProp, TextStyle } from 'react-native';

export interface IPayTermsAndConditionBannerProps {
  testId?: string;
  onPress: () => void;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  onCheckPress: () => void;
  isCheck: boolean;
}
