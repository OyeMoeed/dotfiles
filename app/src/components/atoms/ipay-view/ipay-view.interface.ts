import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the IPayView component.
 */
export interface IPayViewProps {
  /**
   * testID for the flatlist to test the element.
   */
  testID?: string;
  /**
   * The children components to be rendered inside the View.
   */
  children?: ReactNode;
  /**
   * Style for the View container.
   */
  style?: StyleProp<ViewStyle>[];
}
