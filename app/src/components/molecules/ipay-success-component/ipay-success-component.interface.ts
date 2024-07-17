import { ImageStyle, ViewStyle } from 'react-native';

export interface IPaySuccessComponentProps {
  testID?: string;
  style?: ViewStyle;
  iconsStyles?: ImageStyle;
  headingText: string;
  textGradientColors?: string[];
  descriptionText?: string;
  subHeadingText?: string;
}
