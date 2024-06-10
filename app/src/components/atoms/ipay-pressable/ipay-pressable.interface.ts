import { PressableProps, StyleProp } from 'react-native';

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
  children?: JSX.Element;
  /**
   * Style for the Pressable container.
   */
  style?: StyleProp<PressableProps>[] | object;
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
}