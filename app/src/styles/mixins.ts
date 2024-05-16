import { constants } from '@utilities/index';
import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');
const guidelineBaseWidth = constants.IDLE_SCREEN_WIDTH;

/**
 * Scale based on width
 * @param {number} size
 * @returns {number}
 */
export const scaleSize = (size: number): number => (WINDOW_WIDTH / guidelineBaseWidth) * size;

/**
 * Scale font size
 * @param  {number} size
 * @returns {number}
 */
export const scaleFont = (size: number): number => size * PixelRatio.getFontScale();

/**
 * Get styles dimensions for margin or padding
 * @param {number} top top margin
 * @param {number} right right margin
 * @param {number} bottom bottom margin
 * @param {number} left left margin
 * @param {'margin' | 'padding'} property dimension type
 */
const dimensions = (
  top: number,
  right: number = top,
  bottom: number = top,
  left: number = right,
  property: 'margin' | 'padding'
): any => {
  const styles: any = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
};

/**
 * Get styles for margin
 * @param top {number} top margin
 * @param right {number} right margin
 * @param bottom {number} bottom margin
 * @param left {number} left margin
 */
export const margin = (top: number, right?: number, bottom?: number, left?: number): any => {
  return dimensions(top, right, bottom, left, 'margin');
};

/**
 * Get styles for padding
 * @param {number} top top padding
 * @param {number} right right padding
 * @param {number} bottom bottom padding
 * @param {number} left left padding
 */
export const padding = (top: number, right?: number, bottom?: number, left?: number): any => {
  return dimensions(top, right, bottom, left, 'padding');
};

/**
 * Get box shadow style object
 * @param {string} color box shadow color
 * @param {{ width: number, height: number }} offset box shadow offset
 * @param {number} radius box shadow radius
 * @param {number} opacity box shadow opacity
 */
interface IboxShadow {
  color: string;
  offset: { width: number; height: number };
  radius: number;
  opacity: number;
}

export const boxShadow = ({ color, offset = { height: 2, width: 2 }, radius = 8, opacity = 0.2 }: IboxShadow): any => ({
  shadowColor: color,
  shadowOffset: offset,
  shadowOpacity: opacity,
  shadowRadius: radius,
  elevation: radius
});

// You can use this helper function which enables you to get the
// Status Bar height on iOS and Android. For iOS, the calculation
// is done to get the different StatusBar height when >= iPhone X
// (with notch) is used.

const X_WIDTH = constants.IDLE_SCREEN_WIDTH,
  X_HEIGHT = constants.IDLE_SCREEN_HEIGHT,
  XSMAX_WIDTH = constants.XS_MAX_SCREEN_WIDTH,
  XSMAX_HEIGHT = constants.XS_MAX_SCREEN_HEIGHT;

export const isIPhoneX = () =>
  Platform.OS === 'ios' && !Platform.isPad
    ? (WINDOW_WIDTH === X_WIDTH && WINDOW_HEIGHT === X_HEIGHT) ||
      (WINDOW_WIDTH === XSMAX_WIDTH && WINDOW_HEIGHT === XSMAX_HEIGHT)
    : false;

export const StatusBarHeight = Platform.select({
  ios: isIPhoneX() ? 44 : 20,
  android: StatusBar.currentHeight,
  default: 0
});
