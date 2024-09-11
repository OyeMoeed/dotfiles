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
  profileContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.CUSTOME_SCALE(24),
  },
  titleTextStyle: {
    fontWeight: FONT_WEIGHT_BOLD,
    fontSize: FONT_SIZE_22,
    color: colors.primary.primary900,
    lineHeight: spacing.CUSTOME_SCALE(28),
  },
  captionTextStyle: {
    fontWeight: FONT_WEIGHT_NORMAL,
    fontSize: FONT_SIZE_12,
    lineHeight: verticalScale(16),
    textAlign: 'center',
    color: colors.primary.primary800,
    marginTop: moderateScale(4),
    marginBottom: moderateScale(32),
  },
  imageNifazStyle: {
    width: SCALE_18,
    height: SCALE_18,
    borderRadius: SCALE_2,
  },
  detailTextStyle: {
    color: colors.primary.primary500,
    fontSize: FONT_SIZE_15,
    fontWeight: FONT_WEIGHT_NORMAL,
    lineHeight: SCALE_20,
  },
  completTextStyle: {
    color: colors.natural.natural300,
  },
  userRemoveImageStyle: {
    width: moderateScale(54),
    height: moderateScale(54),
    marginTop: verticalScale(20),
  },
  listContainerStyle: {
    marginBottom: verticalScale(8),
  },
});

export default styles;
