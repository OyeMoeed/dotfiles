import OnboardingSteps from '@app/screens/auth/onboarding/onboarding-enum.util';
import { ImageStyle } from 'react-native';

export interface IPayAnimatedImageProps {
  testID?: string;
  type: OnboardingSteps;
  image: string; // Assuming the image is a string representing the image source
  styles?: ImageStyle; // Using ImageStyle from 'react-native' to specify image styles
  runAnimation: boolean;
}
