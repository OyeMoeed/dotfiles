import { variants } from '@app/utilities/enums.util';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * Props for the RNChip component.
 */
export interface IPayChipProps {
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

  isShowRightIcon?: boolean;

  /**
   * boolean for icon to show.
   */

  variant?: variants;
  /**
   * variant for the  component.
   */

  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Style for the overall  contaiStylePropner.
   */
  headingStyles?: StyleProp<TextStyle>;

  icon?: React.ReactElement;
  rightIcon?: React.ReactElement;
}
