import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { CUSTOME_SCALE } from '@app/styles/spacing.const';
import { FONT_SIZE_13, FONT_SIZE_20, FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const transactionHistoryStyle = (colors: any) =>
  createStyleSheet({
    container: {
      width: '100%',
      flex: 1,
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
      fontWeight: FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_20,
      color: colors.natural.natural900,
      lineHeight: moderateScale(20),
    },
    amountHeader: {
      fontSize: FONT_SIZE_13,
    },
    headingStyles: {
      fontSize: moderateScale(13),
      width: '50%',
      flex: 1,
    },
    cardStyle: {
      flexDirection: 'row',
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
      gap: moderateScale(8),
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      width: '50%',
    },
    buttonWrapper: {
      paddingHorizontal: scale(24),
      marginVertical: verticalScale(24),
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
    containerToastStyle: {
      bottom: moderateScale(30),
    },
    beneficiaryLeftImage: {
      height: verticalScale(24),
      width: scaleSize(24),
    },
    listWrapper: {
      paddingHorizontal: scale(24),
    },
    beneficiaryTitleStyle: {
      fontWeight: FONT_WEIGHT_BOLD,
    },
    containerToastIosStyle: {
      position: 'absolute',
      bottom: verticalScale(20),
    },
    fullFlex: {
      flex: 1,
      textAlign: 'right',
    },
  });

export default transactionHistoryStyle;
