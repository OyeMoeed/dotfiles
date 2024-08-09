import { AnimationObject } from 'lottie-react-native';
import { RegisteredStyle, ViewStyle } from 'react-native';

export interface IPayLottieAnimationProps {
  testID?: string;
  source: string | AnimationObject | { uri: string } | undefined;
  style?: ViewStyle | RegisteredStyle<{ [x: string]: any }>;
  autoplay?: boolean;
  loop?: boolean;
}
