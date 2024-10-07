import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const sadadBillsStyles = () =>
  createStyleSheet({
    screenTitle: {
      textTransform: 'none',
    },
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      paddingBottom: verticalScale(24),
    },
    headerStyle: {
      marginHorizontal: moderateScale(24, 0.3),
    },
    listView: {
      flex: 1,
      marginTop: moderateScale(16, 0.3),
    },
    footerView: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
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
    actionSheetStyles: {
      marginBottom: verticalScale(21),
    },
    listBottomConditionalView: {
      marginBottom: moderateScale(210, 0.3),
    },
    btn: {
      justifyContent: 'center',
    },
  });

export default sadadBillsStyles;
