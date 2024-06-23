import { AnimationObject } from 'lottie-react-native';
import { ViewStyle } from 'react-native';

export interface IPayLottieAnimationProps {
  testID?: string;
  source: string | AnimationObject | { uri: string } | undefined;
  style?: ViewStyle;
  autoplay?: boolean;
  loop?: boolean;
}
