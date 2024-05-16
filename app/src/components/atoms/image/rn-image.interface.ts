import { ImageStyle } from 'react-native';

/**
 * Props for the RNImage component.
 */
export interface RNImageProps {
  /**
   * testID for the flatlist to test the element.
   */
  testID?: string;
  /**
   * Style for the image.
   */
  style?: ImageStyle;
  /**
   * Source of the image. It can be a local asset or a URL.
   */
  image: string;
}
