import { variants } from '@app/utilities/enums.util';
import { TextStyle, ViewStyle } from 'react-native';

/**
 * Props for the RNList component.
 */
export interface IPayListProps {
  /**
   * testID for the component to test the element.
   */
  testID?: string;
  /**
   * The heading text to be displayed inside of container.
   */

  title?: string;
  /**
   * text for the  component.
   */

  isShowIcon?: boolean;

  /**
   * boolean for icon to show.
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
  /**
   * leftIcon add
   */
  icon?: React.ReactElement;
  /**
   * leftIcon add
   */
  leftIcon?: React.ReactElement;
  /**
   * image source
   */
  imageSource?: string;
  /**
   * bgColor
   */
  bgColor?: string;
  /**
   * textStyle
   */
  textStyle?: object;
  /**
   * show left icon
   */
  isShowLeftIcon?: boolean;
  /**
   * show right Button
   */
  isShowButton?: boolean;
  /**
   * show time button
   */
  isShowTime?: boolean;
  /**
   * set Time text
   */
  timeText?: string;
  /**
   * show date
   */
  isShowDate?: boolean;
  /**
   * show date
   */
  dateText?: string;
  /**
   * show toggle Button,
   */
  isShowToggleButton?: boolean;
  /**
   * show Toggle State,
   */
  toggleState?: boolean;
  /**
   * show Toggle Change
   */
  onToggleChange?: (isOn: boolean) => void;
  /**
   * show Value button
   */
  isShowCounterButton?: boolean;
  /**
   * show details Text
   */
  detailText?: string;
  /**
   * show detail
   */
  isShowDetail?: boolean;
  /**
   * show detail Text Style
   */
  detailTextStyle?: object;
  /**
   * show SubTitle
   */
  isShowSubTitle?: boolean;
  /**
   * show SubTitle text
   */
  subTitle?: string;
  /**
   * show button text
   */
  btnText?: string;
    /**
   * Callback function called when the Pressable is pressed.
   */
  onPress?: () => void;
 /**
   * trigger function when Press up.
   */
 onPressUp?: () => void;
 /**
  * trigger function when Press down.
  */
 onPressDown?: () => void;
 /**
  * show toggle Button.
  */
 isShowIPayToggleButton?:boolean
}
