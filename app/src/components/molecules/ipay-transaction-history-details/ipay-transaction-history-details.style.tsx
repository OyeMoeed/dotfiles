import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isTablet } from '@app/utilities/constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const transactionDetailsStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    headerView: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    transactionAmount: {
      marginTop: verticalScale(6),
    },
    childComponent: {
      marginTop: verticalScale(20),
      flex: 1,
    },
    transactionCard: {
      width: '100%',
      height: verticalScale(44),
      borderRadius: moderateScale(16),
      paddingHorizontal: moderateScale(18, 0.3),
      paddingVertical: verticalScale(10),
      backgroundColor: colors.natural.natural0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    transactionCardConditionalStyle: {
      marginTop: verticalScale(18),
    },
    detailsView: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    subTitle: {
      alignSelf: 'flex-end',
      textAlign: 'right',
    },
    condtionalWidthSubtitle: {
      width: '50%',
    },
    icon: {
      marginStart: moderateScale(8, 0.3),
    },
    itemSeparatorStyle: {
      height: verticalScale(6),
    },
    toastStyle: {
      marginBottom: isTablet ? verticalScale(3) : verticalScale(45),
    },
    moneyTimeImg: {
      width: moderateScale(24),
      height: moderateScale(24),
    },
  });

export default transactionDetailsStyles;
