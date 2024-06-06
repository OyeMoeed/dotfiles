/**
 * Defines a set of layout and styling constants for consistent design across the application.
 */
import constants from '@app/constants/constants';
import { Dimensions } from 'react-native';
import { spacing } from './spacing.const';

const { width, height } = Dimensions.get('screen');

const layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < constants.IDLE_SCREEN_WIDTH,
  btnRadius: spacing.SCALE_50,
  cardRadius: spacing.SCALE_10,
  inputRadius: spacing.SCALE_12,
  inputHeight: spacing.SCALE_50,
  defaultHeaderHeight: spacing.SCALE_70,
  defaultBottomPadding: spacing.SCALE_70,
  defaultHeaderIconSize: spacing.SCALE_16,
  defaultPagePadding: width < constants.IDLE_SCREEN_WIDTH ? spacing.SCALE_16 : spacing.SCALE_20,
  defaultDateFormat: 'DD.MM.YY',
};

export default layout;
