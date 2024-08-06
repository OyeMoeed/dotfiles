import { ImageStyle, TextStyle, ViewStyle, StyleProp } from 'react-native';

export interface IPaySuccessProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  iconsStyles?: ImageStyle;
  headingText: string;
  textGradientColors?: string[];
  descriptionText?: string;
  subHeadingText?: string;
  /**
   * Style for heading text
   */
  headingStyle?: StyleProp<TextStyle>;

  /**
   * Style for description text
   */
  descriptionStyle?: StyleProp<TextStyle>;
}
