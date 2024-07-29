import { constants } from '@app/components/atoms/ipay-text/constants.text';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { CUSTOME_SCALE } from '@app/styles/spacing.const';
import { FONT_SIZE_17, FONT_SIZE_26 } from '@app/styles/typography.styles';
import { isIosOS } from '@app/utilities/constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';

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
    footnoteBoldTitleTextStyle: {
      fontWeight: constants.FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_17,
      color: colors.primary.primary900,
    },
    footnoteBoldTextStyle: {
      fontWeight: constants.FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_26,
      color: colors.primary.primary900,
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
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: moderateScale(8),
      flex: 0.8,
    },
    buttonWrapper: {
      marginVertical: scaleSize(24),
    },
    button: {
      flex: 1,
      marginBottom: moderateScale(10),
    },
    rejectButton: {
      borderColor: colors.error.error500,
    },
    containerToastStyle: {
      bottom: verticalScale(60),
    },
    text: {
      paddingVertical: moderateScale(2),
      paddingHorizontal: moderateScale(10),
    },
    statusView: {
      borderRadius: moderateScale(8),
    },
  });

export default transactionHistoryStyle;
