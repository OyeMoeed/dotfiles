// ipay-animated-view.interface.ts
import { StyleProp, ViewStyle } from 'react-native';
import { ComposedGesture, GestureType } from 'react-native-gesture-handler';
import { AnimatedStyle } from 'react-native-reanimated';

export interface IPayAnimatedViewProps {
  testID?: string; // Identifier for testing
  style?: StyleProp<ViewStyle>; // Standard styles for a View
  animationStyles?: AnimatedStyle<ViewStyle>; // Updated type for animated styles
  /**
   * to add gesture detector for animation handling
   */
  isGestureDetector?: boolean;
  /**
   * handler function when isGestureDetector is true
   */
  gesture?: ComposedGesture | GestureType;
}
