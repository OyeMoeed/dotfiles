import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const transferInfoStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    contentContainer: {
      flex: 1,
      paddingHorizontal: moderateScale(24),
      marginTop: moderateScale(16),
    },
    container: {
      marginTop: moderateScale(8),
    },
    accountBalanceView: {
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(16),
      borderColor: themeColors.natural.natural0,
      paddingHorizontal: moderateScale(24),
      paddingVertical: moderateScale(18),
      marginBottom: moderateScale(12),
    },
    commonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    balanceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: moderateScale(4),
      marginTop: moderateScale(4),
    },
    currencyStyle: {
      alignSelf: 'flex-end',
    },
    gap: {
      marginTop: moderateScale(12),
    },
    remainingBalanceView: {
      flexDirection: 'row',
    },
    feeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: themeColors.natural.natural0,
      borderRadius: moderateScale(16),
      marginTop: moderateScale(10),
      paddingVertical: moderateScale(12),
      paddingHorizontal: moderateScale(18),
    },
    feeText: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputContainerStyle: {
      marginTop: moderateScale(12),
      paddingLeft: moderateScale(20),
      paddingRight: moderateScale(50),
      backgroundColor: themeColors.natural.natural0,
    },
    nextBtn: {
      marginBottom: moderateScale(24),
      marginTop: moderateScale(20),
      height: verticalScale(50),
      justifyContent: 'center',
    },
    reasonContainer: {
      paddingHorizontal: moderateScale(20),
    },
    iosContainerPadding: {
      paddingBottom: moderateScale(60),
    },
    reasonList: {
      marginBottom: moderateScale(20),
    },
    listItem: {
      marginTop: moderateScale(8),
    },
    darkStyle: {
      color: themeColors.primary.primary900,
    },
    remainingText: {
      color: themeColors.natural.natural700,
    },
    currencyTextStyle: {
      color: themeColors.natural.natural1000,
    },
    heightStyles: {
      borderRadius: moderateScale(16),
      marginVertical: verticalScale(8),
      minWidth: '100%',
      minHeight: verticalScale(38),
      height: 'auto',
      marginTop: 0,
    },
    detailsText: {
      color: themeColors.primary.primary800,
    },
    listImage: {
      width: scaleSize(15),
      height: verticalScale(15),
      resizeMode: 'contain',
    },
    sheetContentContainer: {
      paddingHorizontal: moderateScale(24),
      marginTop: verticalScale(16),
    },
    sheetListHeader: {
      marginBottom: verticalScale(8),
    },
  });

export default transferInfoStyles;
