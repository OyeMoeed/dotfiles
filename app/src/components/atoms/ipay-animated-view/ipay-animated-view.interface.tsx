// ipay-animated-view.interface.ts
import { StyleProp, ViewStyle } from 'react-native';
import { AnimatedStyle } from 'react-native-reanimated';

export interface IPayAnimatedViewProps {
  testID?: string; // Identifier for testing
  style?: StyleProp<ViewStyle>; // Standard styles for a View
  animationStyles?: AnimatedStyle<ViewStyle>; // Updated type for animated styles
}
