import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_1, SCALE_100, SCALE_12, SCALE_16, SCALE_20, SCALE_4, spacing } from '@app/styles/spacing.const';
import { FONT_SIZE_11, FONT_SIZE_13, FONT_SIZE_16, FONT_SIZE_26 } from '@app/styles/typography.styles';

import { moderateScale, verticalScale } from 'react-native-size-matters';

const walletStyles = (colors: any) =>
  createStyleSheet({
    mainWrapper: {
      flex: 1,
    },
    container: {
      paddingHorizontal: moderateScale(20),
    },
    footnoteTextStyle: {
      fontWeight: '400',
      fontSize: FONT_SIZE_13,
      color: colors.natural.natural500,
    },
    progressBarContainer: {
      flexDirection: 'row',
    },
    rightTextStyle: {
      color: colors.primary.primary900,
      fontSize: FONT_SIZE_11,
    },
    codeBarImageStyle: {
      width: 78,
      height: 78,
    },
    codeBarTextStyle: {
      fontSize: FONT_SIZE_16,
      fontWeight: '400',
      color: colors.primary.primary500,
      marginRight: SCALE_4,
    },
    buttonContainer: {
      minWidth: moderateScale(320),
      width: '100%',
      height: verticalScale(50),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: SCALE_1,
      borderColor: colors.primary.primary500,
      borderRadius: SCALE_16,
      marginTop: SCALE_12,
    },
    limitContainer: {
      alignItems: 'center',
      marginTop: SCALE_20,
    },
    progressContainer: {
      width: spacing.CUSTOME_SCALE(201),
      height: verticalScale(170),
      alignItems: 'center',
      justifyContent: 'center',
    },
    gradientBarStyle: {
      width: spacing.CUSTOME_SCALE(100),
      maxHeight: verticalScale(1),
      marginVertical: verticalScale(12),
    },
    limitTextStyle: {
      color: colors.primary.primary800,
      marginBottom: verticalScale(8),
    },
    titleTextStyle: {
      fontWeight: '700',
      fontSize: FONT_SIZE_26,
      color: colors.success.success500,
    },
    arcStyle: {
      borderRadius: SCALE_100,
    },
    toastContainer: {
      position: 'absolute',
      bottom: verticalScale(20),
      left: verticalScale(15),
      right: verticalScale(15),
    },
    amountStyle: {
      color: colors.primary.primary800,
    },
    listTextStyle: {
      color: colors.primary.primary900,
    },
    titleStyle: {
      color: colors.natural.natural500,
    },
  });

export default walletStyles;
