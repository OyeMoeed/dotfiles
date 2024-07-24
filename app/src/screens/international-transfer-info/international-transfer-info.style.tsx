import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const transferInfoStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingHorizontal: scaleFont(24),
      marginTop: scaleFont(16),
    },
    accountBalanceView: {
      borderWidth: scaleFont(1),
      borderRadius: scaleFont(16),
      borderColor: themeColors.natural.natural0,
      paddingHorizontal: scaleFont(24),
      paddingVertical: scaleFont(18),
      marginBottom: scaleFont(12),
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
      gap: scaleFont(4),
      marginTop: scaleFont(4),
    },
    currencyStyle: {
      alignSelf: 'flex-end',
    },
    gap: {
      marginTop: scaleFont(12),
    },
    remainingBalanceView: {
      flexDirection: 'row',
    },
    feeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: themeColors.natural.natural0,
      borderRadius: scaleFont(16),
      marginTop: scaleFont(10),
      paddingVertical: scaleFont(12),
      paddingHorizontal: scaleFont(18),
    },
    feeText: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputContainerStyle: {
      marginTop: scaleFont(12),
      paddingLeft: scaleFont(20),
      paddingRight: scaleFont(50),
      backgroundColor: themeColors.natural.natural0,
    },
    nationalFlag: {
      width: scaleSize(24),
      height: verticalScale(24),
      resizeMode: 'contain',
    },
    nextBtn: {
      marginBottom: scaleFont(16),
      marginTop: scaleFont(20),
    },
    reasonContainer: {
      paddingHorizontal: scaleFont(20),
    },
    reasonList: {
      marginBottom: scaleFont(20),
    },
    listItem: {
      marginTop: scaleFont(8),
    },
  });

export default transferInfoStyles;
