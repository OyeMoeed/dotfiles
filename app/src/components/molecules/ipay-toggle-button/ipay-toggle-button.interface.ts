import { StyleProp, ViewStyle } from 'react-native';

/**
 * Props for ToggleButton component.
 */
export interface IPayToggleButtonProps {
  /**
   * testID for the flatlist to test the element.
   */
  testID?: string;
  /**
   * Custom styles for the ToggleButton.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Current state of the toggle button.
   */
  toggleState?: boolean;
  /**
   * Callback function to handle toggle state change.
   * @param {boolean} isOn - The new state of the toggle button.
   */
  onToggleChange?: (isOn: boolean) => void;
  /**
   * To make toggle button disabled.
   */
  disabled?: boolean;
}