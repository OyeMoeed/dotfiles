import OnboardingSteps from '@app/screens/auth/onboarding/onboarding-enum.util';
import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native-size-matters';

export interface IPayAnimatedButtonProps {
  testID?: string;
  type: OnboardingSteps;
  onNext?: () => void;
  onSkip?: () => void;
  skipText?: string;
  nextText?: string;
  styles?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  runAnimation: boolean;
}
