import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const trafficViolationStyles = () =>
  createStyleSheet({
    rowStyles: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: moderateScale(24),
      marginTop: moderateScale(30),
      marginBottom: moderateScale(5),
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
      marginTop: moderateScale(16, 0.3),
    },
    footerView: {
      position: 'absolute',
      bottom: 0,
      width: '95%',
      marginBottom: moderateScale(24, 0.3),
      alignSelf: 'center',
    },

    footerViewSecondary: {
      position: 'absolute',
      bottom: moderateScale(24, 0.3),
      width: '95%',
      marginBottom: moderateScale(24, 0.3),
      alignSelf: 'center',
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
  });

export default trafficViolationStyles;
