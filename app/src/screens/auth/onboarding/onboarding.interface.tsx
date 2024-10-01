import { ImageSourcePropType, ViewStyle } from 'react-native';
import OnboardingSteps from './onboarding-enum.util';

/**
 * Interface for OnboardingScreen component props
 */
export interface OnboardingScreenProps {
  /**
   * Total number of steps in the onboarding process. Optional.
   */
  steps?: number;

  /**
   * The current step number in the onboarding process. Required.
   */
  currentStep?: number;

  /**
   * The image to display on the onboarding screen. Required.
   */
  image?: ImageSourcePropType;

  /**
   * The title text for the onboarding screen. Required.
   */
  title?: string;

  /**
   * The description text for the onboarding screen. Required.
   */
  description?: string;

  /**
   * The gradient colors for the background of the onboarding screen. Required.
   */
  gradientColors?: string[];

  /**
   * Callback function to handle the skip action. Required.
   */
  onSkip?: () => void;

  /**
   * Callback function to handle the next action. Required.
   */
  onNext?: () => void;

  /**
   * Text for the skip button. Required.
   */
  skipText?: string;

  /**
   * Text for the next button. Required.
   */
  nextText?: string;

  /**
   * The type of onboarding step, as defined by the OnboardingSteps enum. Required.
   */
  type?: OnboardingSteps;

  bottomButtonViewStyle?: ViewStyle;

  runAnimation: boolean;
}
