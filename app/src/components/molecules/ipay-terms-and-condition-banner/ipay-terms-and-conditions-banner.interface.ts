import { StyleProp, TextStyle } from "react-native";

export interface IPayTermsAndConditionBannerProps {
  onPress: () => void;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  icon?: any;
  onCheckPress: () => void;
  isCheck,
  iconSize?: number;
  iconColor?: string;
}
