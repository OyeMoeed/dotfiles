import { StyleProp, TextStyle } from "react-native";

export interface IPayTermsAndConditionBannerProps {
  testId?: string;
  onPress: () => void;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  icon?: any;
  onCheckPress: () => void;
  isCheck: boolean;
  iconSize?: number;
  iconColor?: string;
}
