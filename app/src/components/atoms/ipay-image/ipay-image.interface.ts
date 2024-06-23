import { ImageStyle, StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the RNImage component.
 */
export interface IPayImageProps {
  /**
   * testID for the flatlist to test the element.
   */
  testID?: string;
  /**
   * Style for the image.
   */
  style?: ViewStyle | StyleProp<ImageStyle> | StyleProp<ImageStyle>[];
  /**
   * Source of the image. It can be a local asset or a URL.
   */
  image?: string;

  resizeMode?: string;
}
