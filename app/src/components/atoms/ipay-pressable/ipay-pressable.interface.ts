import { JSX } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the RNPressable component.
 */
export interface IPayPressableProps {
  /**
   * testID for the flatlist to test the element.
   */
  testID?: string;
  /**
   * The children components to be rendered inside the Pressable.
   */
  children?: JSX.Element | JSX.Element[];
  /**
   * Style for the Pressable container.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * If true, the Pressable is disabled and cannot be pressed.
   */
  disabled?: boolean;
  /**
   * The opacity of the Pressable when pressed.
   */
  activeOpacity?: number;
  /**
   * Callback function called when the Pressable is pressed.
   */
  onPress?: () => void;
  /**
   * Callback function called when the Pressable is long pressed.
   */
  onLongPress?: () => void;
  /**
   * Callback function called when a touch gesture is initiated on the Pressable.
   */
  onPressIn?: () => void;
  /**
   * Callback function called when a touch gesture is released on the Pressable.
   */
  onPressOut?: () => void;
  /**
   * AccessiblilityRole Type
   */
  accessibilityRole?: 'button';
  /**
   * AccessiblilityRole State selected
   */
  accessibilityState?: { selected: boolean } | object;
  /**
   * AccessiblilityLable
   */
  accessibilityLabel?: string;
  /**
   * hitSlop for the Pressable.
   */
  hitSlop?: number | { top?: number; left?: number; bottom?: number; right?: number };
}
