import { ImageStyle, ViewStyle } from 'react-native';

export interface IPaySuccessProps {
  testID?: string;
  style?: ViewStyle;
  iconsStyles?: ImageStyle;
  headingText: string;
  textGradientColors?: string[];
  descriptionText?: string;
  subHeadingText?: string;
}
