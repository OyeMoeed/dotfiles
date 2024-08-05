import { StyleProp, ViewStyle } from 'react-native';

export interface IPayCheckboxTitleProps {
  testID?: string;
  checkBoxStyle?: ViewStyle;
  checkboxBackgroundColor?: string;
  onPress?: () => void;
  heading?: string;
  text?: string;
  isCheck?: boolean;
  style?: StyleProp<ViewStyle>;
}
