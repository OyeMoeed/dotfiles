import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_12, SCALE_34 } from '@app/styles/spacing.const';
import { FONT_SIZE_11, FONT_SIZE_12, FONT_SIZE_13, FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const transactionItemStyles = (colors: any) =>
  createStyleSheet({
    historyContStyle: {
      width: '100%',
      paddingLeft: moderateScale(16),
      paddingRight: moderateScale(24),
      justifyContent: 'center',
      paddingVertical: moderateScale(16),
      borderRadius: moderateScale(28),
      backgroundColor: colors.natural.natural0,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: moderateScale(8),
    },
    commonContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      maxHeight: verticalScale(52),
    },
    detailView: {
      flex: 0.8,
    },
    trasnactionTypeText: {
      color: colors.natural.natural900,
      fontSize: FONT_SIZE_12,
      width: moderateScale(146, 0.35),
      textAlign: 'left',
    },
    trasnactionTypeInternationalTransfer: {
      marginTop: verticalScale(3),
      color: colors.natural.natural900,
      fontSize: FONT_SIZE_12,
      width: moderateScale(146, 0.35),
    },
    transactionStatus: {
      color: colors.natural.natural500,
      fontSize: FONT_SIZE_12,
      marginBottom: verticalScale(4),
    },
    iconStyle: {
      width: SCALE_34,
      height: SCALE_34,
      borderRadius: SCALE_12,
      backgroundColor: colors.natural.natural100,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: moderateScale(12),
    },
    footnoteBoldTextStyle: {
      fontWeight: FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_13,
      color: colors.natural.natural900,
      lineHeight: moderateScale(18),
    },
    transactionRequestTypeDescStyle: {
      fontWeight: FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_13,
      color: colors.natural.natural900,
      lineHeight: moderateScale(18),
      width: moderateScale(146, 0.35),
      textAlign: 'left',
    },
    benficiaryInternationalTransfer: {
      color: colors.natural.natural900,
      width: moderateScale(146, 0.35),
      marginTop: verticalScale(12),
    },
    currencyStyle: {
      alignItems: 'flex-end',
    },
    footnoteRedTextStyle: {
      color: colors.error.error500,
    },
    footnoteGreenTextStyle: {
      color: colors.tertiary.tertiary500,
    },
    dateStyle: {
      color: colors.natural.natural500,
      fontSize: FONT_SIZE_11,
      marginTop: moderateScale(4, 0.3),
    },
    leftImageStyle: {
      height: verticalScale(18),
      width: scaleSize(18),
      resizeMode: 'contain',
    },
    textContainer: {
      flexDirection: 'column',
      gap: verticalScale(2),
      justifyContent: 'space-between',
    },
  });

export default transactionItemStyles;
