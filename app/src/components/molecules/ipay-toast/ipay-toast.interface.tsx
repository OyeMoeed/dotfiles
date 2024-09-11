import React, { JSX } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { States } from '@app/utilities/enums.util';

/**
 * Props for the RNList component.
 */
interface IPayToastProps {
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
  viewText?: string;
  /**
   * show detail
   */
  isShowDetail?: boolean;
  /**
   * show detail Text Style
   */
  viewTextStyle?: object;
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
  isShowIPayToggleButton?: boolean;
  /**
   * title color.
   */
  titleColor?: string;
  /**
   * shadow color.
   */
  shadowColor?: string;
  /**
   * border color.
   */
  borderColor?: string;
  /**
   * Shadow color.
   */
  shadowOpacity?: number;

  isShowRightIcon?: boolean;
  rightIcon?: React.ReactElement;
  backgroundColor?: string;
  isBottomSheet?: boolean;
  toastType?: string;
  titleStyle?: StyleProp<TextStyle>;
}

interface ToastHookProps {
  title?: string;
  isShowSubTitle?: boolean;
  subTitle?: string;
  borderColor?: string;
  isShowLeftIcon?: boolean;
  viewText?: string;
  isShowRightIcon?: boolean;
  rightIcon?: React.ReactElement;
  leftIcon?: React.ReactElement;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  isBottomSheet?: boolean;
  toastType?: string;
  titleStyle?: StyleProp<TextStyle>;
}

interface IPayToastContainerProps {
  visible: boolean;
  toastProps: ToastHookProps;
  hideToast: () => void;
}

interface ToastRendererProps {
  title: string;
  subTitle?: string;
  styles?: ViewStyle;
  icon?: JSX.Element;
  toastType?: string;
  displayTime?: number;
}

export { IPayToastContainerProps, IPayToastProps, ToastHookProps, ToastRendererProps };
