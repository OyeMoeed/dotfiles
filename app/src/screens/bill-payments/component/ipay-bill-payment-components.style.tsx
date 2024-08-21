import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const billPaymentsComponentsStyles = (colors: any) =>
  createStyleSheet({
    sadadBillsHeaderView: {
      width: '100%',
      height: moderateScale(54, 0.35),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sadadImg: {
      width: moderateScale(52),
      height: moderateScale(52),
    },
    sadadImageView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    sadadBillsStatuView: {
      marginStart: moderateScale(8, 0.3),
    },
    unpaidText: {
      color: colors.warning.warning500,
      marginTop: moderateScale(4, 0.3),
    },

    // Bill Payments Footer view styles
    billPaymentsFooterView: {
      width: '100%',
      height: moderateScale(250),
      borderTopLeftRadius: moderateScale(48),
      borderTopRightRadius: moderateScale(48),
      backgroundColor: colors.natural.natural0,
    },
    footerChildView: {
      borderTopLeftRadius: moderateScale(48),
      borderTopRightRadius: moderateScale(48),
      paddingTop: moderateScale(24, 0.3),
      paddingHorizontal: moderateScale(24, 0.3),
      backgroundColor: colors.natural.natural0,
    },
    footerCardView: {
      padding: moderateScale(16, 0.3),
      borderRadius: moderateScale(22),
      backgroundColor: colors.natural.natural0,
      width: moderateScale(165),
      height: moderateScale(185),
    },
    itemSeparatorStyle: {
      width: moderateScale(15, 0.3),
    },
    moiIconView: {
      width: moderateScale(56, 0.35),
      borderRadius: moderateScale(12),
      padding: moderateScale(10.45, 0.3),
      backgroundColor: colors.primary.primary10,
    },
    moiIcon: {
      width: moderateScale(32),
      height: moderateScale(32),
    },
    footerBtnView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    footerTitleText: {
      marginTop: moderateScale(16, 0.3),
      marginBottom: moderateScale(18, 0.3),
      width: '80%',
      height: moderateScale(36),
    },
    footerBtn: {
      height: moderateScale(34),
      paddingvertical: moderateScale(7, 0.3),
    },

    /// No Rsults for sadad bills styles
    noResultsView: {
      flex: 1,
      padding: moderateScale(24, 0.3),
      borderRadius: moderateScale(28),
      marginVertical: moderateScale(16, 0.3),
      backgroundColor: colors.natural.natural0,
    },
    noResultIconView: {
      marginBottom: moderateScale(12, 0.3),
    },
    noResultsChildView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addNewBillBtn: {
      marginTop: moderateScale(24, 0.3),
      width: moderateScale(175, 0.35),
    },
  });

export default billPaymentsComponentsStyles;
