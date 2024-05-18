import { variants } from '@app/utilities/enums';
import { TextStyle, ViewStyle } from 'react-native';

/**
 * Props for the RNChip component.
 */
export interface RNChipProps {
  /**
   * testID for the component to test the element.
   */
  testID?: string;
  /**
   * The heading text to be displayed above the input field.
   */
  imageSource?: string;
  /**
   * image source for the component.
   */

  textValue?: string;
  /**
   * text for the  component.
   */

  isShowIcon?: boolean;

  /**
   * boolean for icon to show.
   */

  style?: color | ({} | undefined)[];
  /**
   * style for chip
   */
  variant?: variants;
  /**
   * variant for the  component.
   */

  containerStyle?: ViewStyle;
  /**
   * Style for the overall  container.
   */
  headingStyles?: TextStyle;

  icon?: React.ReactElement;
}
