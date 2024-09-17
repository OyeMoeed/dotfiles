import colors from '@app/styles/colors.const';
import { SCALE_18, SCALE_2, SCALE_20, spacing } from '@app/styles/spacing.const';
import {
  FONT_SIZE_12,
  FONT_SIZE_15,
  FONT_SIZE_22,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_NORMAL,
} from '@app/styles/typography.styles';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  captionTextStyle: {
    color: colors.primary.primary800,
    fontSize: FONT_SIZE_12,
    fontWeight: FONT_WEIGHT_NORMAL,
    lineHeight: verticalScale(16),
    marginBottom: moderateScale(32),
    marginTop: moderateScale(4),
    textAlign: 'center',
  },
  completTextStyle: {
    color: colors.natural.natural300,
  },
  detailTextStyle: {
    color: colors.primary.primary500,
    fontSize: FONT_SIZE_15,
    fontWeight: FONT_WEIGHT_NORMAL,
    lineHeight: SCALE_20,
  },
  imageNifazStyle: {
    borderRadius: SCALE_2,
    height: SCALE_18,
    width: SCALE_18,
  },
  listContainerStyle: {
    marginBottom: verticalScale(8),
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.CUSTOME_SCALE(24),
    width: '100%',
  },
  titleTextStyle: {
    color: colors.primary.primary900,
    fontSize: FONT_SIZE_22,
    fontWeight: FONT_WEIGHT_BOLD,
    lineHeight: spacing.CUSTOME_SCALE(28),
  },
  userRemoveImageStyle: {
    height: moderateScale(54),
    marginTop: verticalScale(20),
    width: moderateScale(54),
  },
});

export default styles;
