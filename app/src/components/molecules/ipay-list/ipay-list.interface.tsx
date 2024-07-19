import { States } from '@app/utilities/enums.util';
import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

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

  variant?: States;
  /**
   * variant for the  component.
   */

  containerStyle?: StyleProp<ViewStyle>;
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
   * textStyle
   */
  textStyle?: object;
  /**
   * show left icon
   */
  isShowLeftIcon?: boolean;
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
   * trigger function when Press on icon.
   */
  onPressIcon?: () => void;
  /**
   * show toggle Button.
   */
  isShowIPayToggleButton?: boolean;
  /**
   * subTextStyle
   */
  subTextStyle?: TextStyle;
  /**
   * Save document
   */
  onPressSaveQR?: () => void;
  /**
   * custom style for container.
   */
  style?: ViewStyle;
  /**
   * show button and text.
   */
  isShowSaveQRButton?: boolean;
  /**
   * custom style for center component which is title and description
   */
  centerContainerStyles?: ViewStyle;
  /**
   * custom style for left icon container
   */
  leftIconContainerStyles?: ViewStyle;
  /**
   * custom style for right container
   */
  rightContainerStyles?: ViewStyle;
  /**
   * shows the deatil text
   * */
  isShowDetail?: boolean;
  /**
   * will show text on right side
   * */
  rightText?: React.JSX.Element;
  onDatePress?: () => void;
  onTimePress?: () => void;
  showDetail?: boolean;
  children?: React.ReactNode;
}
