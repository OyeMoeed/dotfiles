import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isTablet } from '@app/utilities/constants';
import { moderateScale } from 'react-native-size-matters';

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
      marginTop: moderateScale(8, 0.3),
    },
    childComponent: {
      marginTop: moderateScale(24, 0.4),
      flex: 1,
    },
    transactionCard: {
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
    transactionCardConditionalStyle: {
      marginTop: moderateScale(24, 0.3),
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
      height: moderateScale(8),
    },
    toastStyle: {
      marginBottom: isTablet ? moderateScale(4) : moderateScale(45),
    },
  });

export default transactionDetailsStyles;
