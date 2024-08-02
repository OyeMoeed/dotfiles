import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_15, FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const ipayBillSuccessStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    childContainer: {
      flex: 1,
      borderRadius: scaleSize(48),
      backgroundColor: themeColors.natural.natural50,
      marginVertical: verticalScale(16),
      paddingHorizontal: moderateScale(20),
      paddingVertical: verticalScale(24),
    },
    boldStyles: {
      fontWeight: FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_15,
    },
    minFlex: {
      flex: 0,
    },
    bottomView: {
      paddingVertical: verticalScale(8),
    },
    conatinerStyles: {
      borderRadius: moderateScale(22),
      paddingHorizontal: moderateScale(20),
      paddingVertical: verticalScale(15),
      backgroundColor: themeColors.natural.natural0,
    },
    optionsStyle: { backgroundColor: themeColors.primary.primary10 },
    marginStyles: { marginBottom: verticalScale(16) },
    chipWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: verticalScale(20),
    },
    billContainer: {
      paddingHorizontal: 0,
    },
    listContainer: {
      backgroundColor: themeColors.error.error25,
      marginBottom: verticalScale(10),
    },
    btnWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: verticalScale(20),
    },
    btnStyle: {
      justifyContent: 'center',
      height: moderateScale(50),
    },
    saveContainer: {
      marginTop: moderateScale(12),
    },
    headingStyle: {
      textAlign: 'center',
    },
  });

export default ipayBillSuccessStyles;
