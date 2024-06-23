import { ViewStyle } from 'react-native';

export interface IPaySkeletonViewProps {
  isLoading: boolean;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  /**
   * testID for the component to test the element.
   */
  testID?: string;
}
