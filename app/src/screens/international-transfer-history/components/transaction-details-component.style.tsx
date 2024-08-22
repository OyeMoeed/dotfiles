import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isTablet } from '@app/utilities/constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const transactionDetailsCompStyles = (colors?: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(16, 0.3),
      marginBottom: isTablet ? moderateScale(35) : moderateScale(85),
      marginTop: moderateScale(8),
      overflow: 'hidden',
    },
    containerContiditional: {
      marginBottom: isTablet ? moderateScale(45) : moderateScale(90),
    },
    listView: {
      flex: 1,
      marginBottom: moderateScale(12),
    },
    footerView: {
      height: verticalScale(80),
    },
    buttonsView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    btnStyles: {
      width: '48%',
      height: verticalScale(34),
      paddingVertical: verticalScale(7),
    },
    shareBtn: {
      height: verticalScale(34),
      paddingVertical: verticalScale(7),
    },
    vatBtn: {
      marginTop: moderateScale(12),
      height: verticalScale(34),
      paddingVertical: verticalScale(7),
    },

    /// Refund Component styles
    refundMainView: {
      flex: 1,
      width: '100%',
      paddingHorizontal: moderateScale(16, 0.3),
      marginTop: moderateScale(8),
    },
    refundHeaderView: {
      alignItems: 'center',
      justifyContent: 'cneter',
    },
    refundText: {
      marginTop: moderateScale(16, 0.3),
      marginBottom: moderateScale(8, 0.3),
    },
    redundChildView: {
      flex: 1,
      marginVertical: moderateScale(32, 0.3),
    },
    refundCautionView: {
      width: isTablet ? '100%' : verticalScale(250),
    },
    refundFooterView: {
      height: isTablet ? moderateScale(190) : verticalScale(235),
      width: '100%',
    },
    refundBtn: {
      marginVertical: moderateScale(12, 0.3),
    },
    refundTransactionCard: {
      width: '100%',
      height: moderateScale(48, 0.3),
      borderRadius: moderateScale(16),
      paddingHorizontal: moderateScale(18, 0.3),
      paddingVertical: moderateScale(12, 0.3),
      backgroundColor: colors.natural.natural0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    refundDetailsView: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    refundSubTitle: {
      alignSelf: 'flex-end',
      textAlign: 'right',
    },
    refundIcon: {
      marginStart: moderateScale(8, 0.3),
    },
    refundItemSeparatorStyle: {
      height: moderateScale(8),
    },
    refundToastStyle: {
      marginBottom: isTablet ? moderateScale(4) : moderateScale(45),
    },

    /// Edit Beneficary Styles
    editBeneficiaryView: {
      flex: 1,
      width: '100%',
      paddingHorizontal: moderateScale(16, 0.3),
      marginTop: moderateScale(8),
    },
    editBeneficiaryCautionView: {
      paddingHorizontal: moderateScale(18, 0.3),
      paddingVertical: moderateScale(12, 0.3),
      borderRadius: moderateScale(16),
      backgroundColor: colors.natural.natural0,
      flexDirection: 'row',
      alignItems: 'center',
    },
    editBeneficiaryInfoText: {
      color: colors.natural.natural900,
      width: '88%',
      marginStart: moderateScale(16, 0.3),
    },
    editBeneficiaryInputText: {
      backgroundColor: colors.natural.natural0,
      borderColor: colors.primary.primary500,
      marginTop: moderateScale(32, 0.3),
      marginBottom: moderateScale(12, 0.3),
    },

    /// Edit beneficiary confirmation styles
    editBeneficiaryContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    messageStyle: {
      textAlign: 'center',
    },
    emptyRecordImage: {
      width: moderateScale(50),
      height: moderateScale(60),
      marginBottom: moderateScale(15),
    },
    iconWrapper: {
      marginRight: moderateScale(12),
    },
    displayInRowStyle: {
      flexDirection: 'row',
    },
    displayInRowImageStyle: {
      marginBottom: 0,
      marginRight: moderateScale(12),
    },
    beneficaryNameView: {
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(16),
      paddingHorizontal: moderateScale(18, 0.3),
      paddingVertical: moderateScale(12, 0.3),
      marginBottom: moderateScale(12, 0.3),
      marginTop: moderateScale(4, 0.3),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export default transactionDetailsCompStyles;
