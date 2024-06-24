import constants from '@app/constants/constants';
import { Dimensions, Platform, StatusBar } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import colors from './colors.const';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

/**
 * Linear scaled result of the provided size, based on your device's screen width
 * @param {number} size
 * @returns {number}
 */
const scaleSize = (size: number): number => scale(size);

/**
 * This fucntion is used to get a custom scale size.
 * It calculates the percentage for that number with respects to screen witdth.
 * It expects a number and return a number.
 * @param {number} value
 * @returns {number}
 */
const createCustomScale = (value: number): number => scaleSize(value);

/**
 * Scale font size
 * @param  {number} size
 * @param  {number} factor It can use to control the resize factor (default is 0.5)
 * @returns {number}
 */
const scaleFont = (size: number, factor: number = 0.3): number => moderateScale(size, factor);

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
const margin = (top: number, right?: number, bottom?: number, left?: number): any =>
  dimensions(top, right, bottom, left, 'margin');

/**
 * Get styles for padding
 * @param {number} top top padding
 * @param {number} right right padding
 * @param {number} bottom bottom padding
 * @param {number} left left padding
 */
const padding = (top: number, right?: number, bottom?: number, left?: number): any =>
  dimensions(top, right, bottom, left, 'padding');

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

const boxShadow = ({
  color = colors.natural.natural900,
  offset = { height: 2, width: 2 },
  radius = 8,
  opacity = 0.2
}: IboxShadow): any => ({
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

const X_WIDTH = constants.IDLE_SCREEN_WIDTH;
const X_HEIGHT = constants.IDLE_SCREEN_HEIGHT;
const XSMAX_WIDTH = constants.XS_MAX_SCREEN_WIDTH;
const XSMAX_HEIGHT = constants.XS_MAX_SCREEN_HEIGHT;

const isIPhoneX = () =>
  Platform.OS === 'ios' && !Platform.isPad
    ? (WINDOW_WIDTH === X_WIDTH && WINDOW_HEIGHT === X_HEIGHT) ||
      (WINDOW_WIDTH === XSMAX_WIDTH && WINDOW_HEIGHT === XSMAX_HEIGHT)
    : false;

const StatusBarHeight = Platform.select({
  ios: isIPhoneX() ? 44 : 20,
  android: StatusBar.currentHeight,
  default: 0
});

export {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  StatusBarHeight,
  boxShadow,
  createCustomScale,
  isIPhoneX,
  margin,
  padding,
  scaleFont,
  scaleSize
};
