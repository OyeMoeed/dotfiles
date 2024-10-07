import OnboardingSteps from '@app/screens/auth/onboarding/onboarding-enum.util';
import { StyleProp, ViewStyle } from 'react-native';

export interface IPayAnimatedTextProps {
  testID?: string;
  type: OnboardingSteps;
  title: string;
  description: string;
  style?: StyleProp<ViewStyle>;
  runAnimation: boolean;
}
