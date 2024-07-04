import { constants } from '@app/components/atoms/ipay-text/constants.text';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { CUSTOME_SCALE } from '@app/styles/spacing.const';
import { FONT_SIZE_13, FONT_SIZE_20 } from '@app/styles/typography.styles';
import { isIosOS } from '@app/utilities/constants';
import { moderateScale } from 'react-native-size-matters';

const transactionHistoryStyle = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      marginBottom: isIosOS ? moderateScale(100) : 0,
    },
    amountSection: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
      marginBottom: moderateScale(16),
    },
    footnoteRedTextStyle: {
      color: colors.error.error500,
    },
    footnoteGreenTextStyle: {
      color: colors.tertiary.tertiary500,
    },
    footnoteBoldTextStyle: {
      fontWeight: constants.FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_20,
      color: colors.natural.natural900,
      lineHeight: moderateScale(20),
    },
    amountHeader: {
      fontSize: FONT_SIZE_13,
    },
    headingStyles: {
      fontSize: moderateScale(13),
    },
    cardStyle: {
      flexDirection: 'row',
      width: CUSTOME_SCALE(311),
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.natural.natural0,
      marginTop: scaleSize(8),
      borderRadius: scaleSize(16),
      paddingHorizontal: scaleSize(18),
      paddingVertical: scaleSize(15),
    },
    actionWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: moderateScale(8),
    },
    buttonWrapper: {
      marginVertical: scaleSize(24),
    },
    conditionButtonWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: moderateScale(8),
    },
    conditionButton: {
      width: CUSTOME_SCALE(150),
    },
    button: {
      // borderRadius: moderateScale(12),
      marginBottom: moderateScale(10),
    },
  });

export default transactionHistoryStyle;
