import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const moneyRequestStyles = (theme: typeof colors) =>
  createStyleSheet({
    container: {
      marginHorizontal: moderateScale(24, 0.3),
      justifyContent: 'space-between',
      flex: 1,
      marginBottom: moderateScale(22),
    },
    flatlist: {
      flex: 0,
    },
    listContainer: {
      backgroundColor: theme.natural.natural0,
      width: '100%',
      borderRadius: moderateScale(16),
      marginBottom: moderateScale(8),
    },
    leftIconCard: {
      height: moderateScale(22),
      width: moderateScale(22),
    },
    iconLabel: {
      flexDirection: 'row',
      marginRight: moderateScale(2),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    listView: {
      paddingVertical: moderateScale(12),
      paddingHorizontal: moderateScale(18),
      justifyContent: 'space-between',
      width: '100%',
      flexDirection: 'row',
    },
    walletListBackground: {
      backgroundColor: theme.backgrounds.successBackground,
      borderRadius: moderateScale(22),
      padding: moderateScale(16),
      justifyContent: 'space-between',
    },
    gradientBg: {
      backgroundColor: theme.appGradient.buttonBackground,
      flex: 0,
      padding: moderateScale(16),
      gap: moderateScale(16),
      borderRadius: moderateScale(22),
    },
    listDetails: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftIcon: {
      marginRight: moderateScale(12),
    },
    detailsText: { color: theme.primary.primary800 },
  });
export default moneyRequestStyles;
