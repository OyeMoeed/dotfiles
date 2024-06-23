import { ViewStyle } from 'react-native';

export interface IPayPageDescriptionTextProps {
  testID?: string;
  heading?: string;
  text?: string;
  style?: ViewStyle;
  /**
   * custom boolean prop to align text left.
   */
  alignTextLeft?: boolean;
}
