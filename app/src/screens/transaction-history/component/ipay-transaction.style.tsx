import { constants } from '@app/components/atoms/ipay-text/constants.text';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_12, SCALE_34 } from '@app/styles/spacing.const';
import { FONT_SIZE_13 } from '@app/styles/typography.styles';
import { moderateScale } from 'react-native-size-matters';

const transactionItemStyles = (colors: any) =>
  createStyleSheet({
    historyContStyle: {
      width: '100%',
      paddingHorizontal: moderateScale(16),
      paddingVertical: moderateScale(18),
      borderRadius: moderateScale(28),
      backgroundColor: colors.natural.natural0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: moderateScale(8),
    },
    commonContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconStyle: {
      width: SCALE_34,
      height: SCALE_34,
      borderRadius: SCALE_12,
      backgroundColor: colors.natural.natural100,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: moderateScale(8),
    },
    footnoteBoldTextStyle: {
      fontWeight: constants.FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_13,
      color: colors.natural.natural900,
      lineHeight: moderateScale(18),
    },
    currencyStyle: {
      justifyContent: 'space-between',
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
      lineHeight: moderateScale(20),
    },
  });

export default transactionItemStyles;
