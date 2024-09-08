import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native-size-matters';

export interface ProgressBarProps {
  /**
   * testID for the flatlist to test the element.
   */
  testID?: string;
  colors: string[];

  /**
   * a boolean prop that run in form of decreasing progress
   */
  reverse?: boolean;

  /**
   * a boolean prop that changes progressbar color to red on complete
   */
  showExpired?: boolean;

  /**
   * Callback that runs on complete of progress.
   */
  onComplete?: () => void;

  /**
   * Style prop for container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Width of the gradient itself
   */
  gradientWidth?: string | number;

  /**
   * Interval in miliseconds to increse/decrease progress bar width.
   */
  intervalTime?: number;

  compeleted?: boolean;
}
