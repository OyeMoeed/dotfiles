import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import { SCALE_16, SCALE_4, spacing } from '@app/styles/spacing.const';
import { FONT_SIZE_12, FONT_SIZE_22 } from '@app/styles/typography.styles';
import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  topStyles: {
    marginVertical: scaleSize(30),
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.CUSTOME_SCALE(24),
  },
  titleTextStyle: {
    fontWeight: '700',
    fontSize: FONT_SIZE_22,
    color: colors.primary.primary900,
    lineHeight: spacing.CUSTOME_SCALE(28),
    textAlign: 'center',
    marginTop: SCALE_16,
  },
  captionTextStyle: {
    fontWeight: '400',
    fontSize: FONT_SIZE_12,
    lineHeight: SCALE_16,
    textAlign: 'center',
    color: colors.primary.primary800,
    marginVertical: SCALE_4,
  },
  buttonStyle: {
    minWidth: '100%',
    minHeight: spacing.CUSTOME_SCALE(48),
    width: 'auto',
    height: 'auto',
    borderRadius: SCALE_16,
    backgroundColor: colors.primary.primary500,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  imageStyle: {
    width: moderateScale(64),
    height: moderateScale(64),
    marginTop: verticalScale(30),
    marginBottom: verticalScale(16),
  },
  bodyTextStyle: {
    fontSize: moderateScale(17),
    lineHeight: moderateScale(22),
    fontWeight: '400',
    color: colors.white,
  },
  skipTextStyle: {
    fontSize: moderateScale(17),
    lineHeight: moderateScale(22),
    fontWeight: '400',
    color: colors.primary.primary500,
  },
  skipBtnStyle: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary.primary500,
  },
});

export default styles;
