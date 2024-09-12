import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import { SCALE_16, SCALE_4, spacing } from '@app/styles/spacing.const';
import { FONT_SIZE_12, FONT_SIZE_22 } from '@app/styles/typography.styles';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  bodyTextStyle: {
    color: colors.white,
    fontSize: moderateScale(17),
    fontWeight: '400',
    lineHeight: moderateScale(22),
  },
  buttonStyle: {
    backgroundColor: colors.primary.primary500,
    borderRadius: SCALE_16,
    flexDirection: 'row',
    height: 'auto',
    justifyContent: 'center',
    marginTop: 30,
    minHeight: spacing.CUSTOME_SCALE(48),
    minWidth: '100%',
    width: 'auto',
  },
  captionTextStyle: {
    color: colors.primary.primary800,
    fontSize: FONT_SIZE_12,
    fontWeight: '400',
    lineHeight: SCALE_16,
    marginVertical: SCALE_4,
    textAlign: 'center',
  },
  imageStyle: {
    height: moderateScale(64),
    marginBottom: verticalScale(16),
    marginTop: verticalScale(30),
    width: moderateScale(64),
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.CUSTOME_SCALE(24),
  },
  skipBtnStyle: {
    backgroundColor: colors.transparent,
    borderColor: colors.primary.primary500,
    borderWidth: 1,
  },
  skipTextStyle: {
    color: colors.primary.primary500,
    fontSize: moderateScale(17),
    fontWeight: '400',
    lineHeight: moderateScale(22),
  },
  titleTextStyle: {
    color: colors.primary.primary900,
    fontSize: FONT_SIZE_22,
    fontWeight: '700',
    lineHeight: spacing.CUSTOME_SCALE(28),
    marginTop: SCALE_16,
    textAlign: 'center',
  },
  topStyles: {
    marginVertical: scaleSize(30),
  },
});

export default styles;
