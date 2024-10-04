import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_15, FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const ipayBillSuccessStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    childContainer: {
      flex: 1,
      borderRadius: moderateScale(48),
      backgroundColor: themeColors.natural.natural50,
      marginVertical: moderateScale(16),
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(24),
    },
    boldStyles: {
      fontWeight: FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_15,
    },
    descriptionText: {
      marginTop: moderateScale(10, 0.3),
    },
    minFlex: {
      flex: 0,
    },
    conatinerStyles: {
      borderRadius: moderateScale(22),
      paddingHorizontal: moderateScale(12),
      paddingVertical: moderateScale(15),
      backgroundColor: themeColors.natural.natural0,
      marginTop: moderateScale(10),
    },
    optionsStyle: { backgroundColor: themeColors.primary.primary10 },
    marginStyles: { marginBottom: moderateScale(16) },
    chipWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: moderateScale(20),
    },
    billContainer: {
      paddingHorizontal: 0,
      backgroundColor: themeColors.natural.natural0,
      paddingBottom: moderateScale(0),
      paddingTop: moderateScale(0),
    },
    listContainer: {
      backgroundColor: themeColors.error.error25,
      marginBottom: moderateScale(10),
    },
    btnWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: moderateScale(6),
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
    footerView: {
      marginTop: verticalScale(12),
    },
    successScrollView: { flex: 0, height: verticalScale(280) },
  });

export default ipayBillSuccessStyles;
