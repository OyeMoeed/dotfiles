import { ViewStyle } from "react-native-size-matters";

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
  style?: ViewStyle; // Width of the gradient itself
  
  gradientWidth?: string | number; // Width of the gradient itself
  /***
   * Width of the gradient itself
   */

  /**
   * Interval in miliseconds to increse/decrease progress bar width.
   */
  intervalTime?: number;
}
