import { StyleProp, ViewStyle } from 'react-native';

export interface IPaySectionHeaderProps {
  leftText: string;
  subText?: string;
  rightText?: string;
  subTextColor?: string;
  showRightIcon?: boolean;
  rightIcon?: string;
  showDotBeforeSubtext?: boolean;
  isLeftTextRegular?: boolean;
  leftTextColor?: string;
  testID?: string;
  onRightOptionPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}
