import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const moiPaymentSuccessStyles = (themeColor: typeof colors) =>
  createStyleSheet({
    innerLinearGradientView: {
      borderRadius: moderateScale(48),
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: scaleSize(20),
      paddingTop: moderateScale(40),
      paddingBottom: scaleSize(20),
      paddingHorizontal: moderateScale(20, 0.3),
    },
    headerView: {
      flex: 0.4,
      marginBottom: moderateScale(20, 0.3),
    },
    itemSeparatorStyle: {
      height: verticalScale(8),
    },
    listView: {
      height: verticalScale(244),
    },
    dataTopView: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      marginTop: moderateScale(8),
      borderRadius: moderateScale(22),
      backgroundColor: themeColor.natural.natural0,
      padding: moderateScale(12, 0.3),
    },
    dataBottomView: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      marginTop: moderateScale(16),
      borderRadius: moderateScale(22),
      backgroundColor: themeColor.natural.natural0,
      padding: moderateScale(12, 0.3),
    },
    transactionDetailsView: {
      flex: 1,
      alignItems: 'flex-end',
    },
    dataCardView: {
      flex: 1,
      width: '100%',
      backgroundColor: themeColor.primary.primary10,
      borderRadius: moderateScale(16),
      height: moderateScale(48),
      paddingHorizontal: moderateScale(18, 0.3),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    detailsView: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    valueStyle: {
      alignSelf: 'flex-end',
      textAlign: 'right',
    },
    condtionalWidthSubtitle: {
      width: '50%',
    },
    icon: {
      marginStart: moderateScale(8, 0.3),
    },
    footerView: {
      width: '100%',
      paddingTop: moderateScale(8),
    },
    linkButtonsView: {
      width: '100%',
      paddingEnd: moderateScale(24, 0.3),
      marginBottom: moderateScale(14),
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    beneficiaryBankDetailsView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: moderateScale(18, 0.3),
      paddingvertical: verticalScale(12),
      borderRadius: moderateScale(22),
      marginBottom: moderateScale(8),
      height: verticalScale(58),
      backgroundColor: themeColor.natural.natural0,
    },
    bankDetailsView: {
      marginStart: moderateScale(16, 0.3),
    },
    bankTitleView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    imageStyle: {
      width: scaleSize(27),
      height: moderateScale(18),
    },
    iconStyle: {
      width: moderateScale(14),
      height: moderateScale(14),
    },
    homeIcon: {
      width: moderateScale(20),
      height: moderateScale(20),
    },
  });

export default moiPaymentSuccessStyles;
