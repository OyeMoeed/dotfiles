import { constants } from '@app/components/atoms/ipay-text/constants.text';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_1, SCALE_16, SCALE_8 } from '@app/styles/spacing.const';
import { FONT_SIZE_11, FONT_SIZE_13, FONT_SIZE_22 } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const genratedStyles = (colors: any) =>
  createStyleSheet({
    container: {
      minHeight: moderateScale(383),
      width: 'auto',
      height: 'auto',
      borderRadius: moderateScale(48),
      paddingHorizontal: moderateScale(32),
      paddingTop: moderateScale(32),
      paddingBottom: moderateScale(16),
      backgroundColor: colors.white,
    },
    eyeCon: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textStyle: {
      marginRight: SCALE_8,
      fontSize: FONT_SIZE_13,
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      lineHeight: verticalScale(18),
      textAlign: 'center',
    },
    commonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    balanceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    currencyStyle: {
      alignSelf: 'flex-end',
      fontSize: FONT_SIZE_13,
      lineHeight: verticalScale(18),
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      color: colors.natural.natural900,
    },
    btnStyle: {
      minHeight: moderateScale(34),
      width: moderateScale(99),
      height: 'auto',
      backgroundColor: colors.primary.primary500,
      borderRadius: moderateScale(12),
      justifyContent: 'center',
    },
    gap: {
      marginTop: verticalScale(12),
    },
    lineBorderStyle: {
      borderWidth: SCALE_1,
      borderColor: colors.secondary.secondary100,
      width: '100%',
      marginVertical: SCALE_16,
    },
    balanceTextStyle: {
      fontWeight: constants.FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_22,
      lineHeight: verticalScale(28),
      color: colors.natural.natural900,
      textAlign: 'center',
    },
    iconConStyle: {
      width: moderateScale(48),
      minHeight: moderateScale(48),
      height: 'auto',
      borderRadius: moderateScale(18),
      backgroundColor: colors.natural.natural100,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: verticalScale(8),
    },
    carouselContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: SCALE_8,
      borderWidth: moderateScale(1),
      borderColor: 'red',
    },
    subContainer: {
      width: moderateScale(83),
      height: verticalScale(70),
      alignItems: 'center',
    },
    gapListStyle: {
      marginBottom: moderateScale(5),
    },
    paginationStyle: {
      width: moderateScale(35),
      height: moderateScale(4),
    },
    iconTextStyle: {
      fontSize: FONT_SIZE_11,
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      lineHeight: verticalScale(13),
      color: colors.primary.primary900,
    },
    captionTextStyle: {
      fontWeight: constants.FONT_WEIGHT_NORMAL,
      fontSize: FONT_SIZE_11,
      lineHeight: verticalScale(13),
      color: colors.natural.natural700,
    },
    carousel: {
      width: '100%',
      height: '100%',
    },
    listStyleCont: {
      width: '100%',
      height: '100%',
    },
    captionBoldNumStyle: {
      fontWeight: constants.FONT_WEIGHT_BOLD,
    },
    progressBarStyle: {
      height: verticalScale(4),
    },
    gapListRow: {
      marginHorizontal: 'auto',
    },
  });

export default genratedStyles;
