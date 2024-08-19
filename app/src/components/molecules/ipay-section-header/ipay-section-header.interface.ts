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
  onPress?: () => void;
}
