import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const transferConfirmationStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingVertical: moderateScale(18),
    },
    bottomChild: {
      height: verticalScale(260),
    },
    bottomView: {
      paddingTop: moderateScale(8),
      paddingBottom: moderateScale(30),
      alignSelf: 'center',
      overflow: 'hidden',
    },
    footerView: {
      flex: 1,
      padding: moderateScale(20, 0.3),
      borderRadius: moderateScale(28),
      marginHorizontal: moderateScale(24, 0.3),
    },
    transferInfoView: {
      padding: moderateScale(20, 0.3),
      borderRadius: moderateScale(28),
      flexDirection: 'row',
      backgroundColor: colors.natural.natural0,
    },
    transferAmountDetailsText: {
      width: '85%',
      marginHorizontal: moderateScale(16, 0.3),
    },
    beneficiaryDetailsView: {
      alignItems: 'center',
      marginHorizontal: moderateScale(24, 0.3),
      paddingVertical: moderateScale(24),
      paddingHorizontal: moderateScale(16, 0.3),
      borderRadius: moderateScale(48),
      backgroundColor: colors.natural.natural0,
      overflow: 'hidden',
    },
    beneficiaryBankDetailsView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: moderateScale(18, 0.3),
      paddingvertical: verticalScale(12),
      borderRadius: moderateScale(16),
      marginBottom: moderateScale(8),
      height: verticalScale(58),
      backgroundColor: colors.natural.natural0,
    },
    totalAmountView: {
      marginTop: moderateScale(8),
      marginBottom: moderateScale(16),
    },
    smallerTabView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: moderateScale(18, 0.3),
      paddingvertical: verticalScale(12),
      borderRadius: moderateScale(16),
      height: verticalScale(48),
      backgroundColor: colors.natural.natural0,
    },
    itemSeparatorStyle: {
      height: moderateScale(8),
    },
    subTitleView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    fastCovertionIcon: {
      width: verticalScale(18),
      height: verticalScale(18),
      marginStart: moderateScale(8),
    },
    bankDetailsView: {
      marginStart: moderateScale(16, 0.3),
    },
    bankTitleView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bankLogo: {
      width: verticalScale(24),
      height: verticalScale(24),
    },
    taxView: {
      marginVertical: moderateScale(24, 0.3),
    },
    feesView: {
      marginTop: moderateScale(8),
    },
  });

export default transferConfirmationStyles;
