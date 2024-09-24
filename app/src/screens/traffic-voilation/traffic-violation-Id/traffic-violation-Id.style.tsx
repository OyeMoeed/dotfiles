import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isTablet } from '@app/utilities/constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const trafficViolationStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    rowStyles: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: moderateScale(24),
      marginTop: moderateScale(30),
      marginBottom: moderateScale(5),
    },
    foundViolationContainer: {
      marginBottom: 0,
    },
    detailsText: {
      color: themeColors.primary.primary800,
    },
    screenTitle: {
      textTransform: 'none',
    },
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
    },
    listView: {
      flex: 1,
      marginTop: moderateScale(14, 0.3),
    },
    footerView: {
      position: 'absolute',
      bottom: 0,
      marginBottom: moderateScale(24, 0.3),
      width: '100%',
      alignSelf: 'center',
    },

    footerViewSecondary: {
      position: 'absolute',
      bottom: moderateScale(24, 0.3),
      width: isTablet ? scale(322) : moderateScale(330, 0.35),
      marginBottom: moderateScale(24, 0.3),
    },

    itemSeparatorStyle: {
      height: moderateScale(12, 0.3),
    },
    listBottomView: {
      marginBottom: moderateScale(160, 0.3),
    },
    noResultView: {
      flex: 1,
      alignItems: 'center',
      marginTop: verticalScale(200),
    },
    noResultIconView: {
      marginBottom: moderateScale(12, 0.3),
    },
    addNewBillBtn: {
      marginTop: moderateScale(24, 0.3),
      width: moderateScale(175, 0.35),
    },
    btnStyle: {
      borderRadius: moderateScale(16),
      paddingVertical: 0,
      height: moderateScale(50),
    },
  });

export default trafficViolationStyles;
