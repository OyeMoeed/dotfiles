import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const sadadFooterComponentStyles = (colors: any) =>
  createStyleSheet({
    container: {
      height: moderateScale(124, 0.3),
    },
    containerConditionalStyles: {
      height: moderateScale(170, 0.3),
    },
    countAndPartialPayStyles: {
      height: moderateScale(188, 0.3),
    },
    footerWithWarning: {
      height: verticalScale(112),
    },
    gradientView: {
      padding: moderateScale(16, 0.3),
      borderRadius: moderateScale(28),
      backgroundColor: colors.natural.natural0,
    },
    selectedItemsCountView: {
      flexDirection: 'row',
      marginBottom: moderateScale(12, 0.3),
      gap: moderateScale(4),
    },
    totalAmountView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: moderateScale(12, 0.3),
      paddingHorizontal: moderateScale(18, 0.3),
      marginBottom: moderateScale(16, 0.3),
      borderRadius: moderateScale(16),
      height: moderateScale(48, 0.3),
      backgroundColor: colors.natural.natural0,
    },
    chipView: {
      marginBottom: moderateScale(16, 0.3),
      width: '100%',
    },
    partialPayBtn: {
      width: '100%',
    },
  });

export default sadadFooterComponentStyles;
