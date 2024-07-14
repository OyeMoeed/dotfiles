import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale } from 'react-native-size-matters';

const termsAndConditionBannerStyle = (colors: typeof themeColors) =>
  createStyleSheet({
    termsAndConditionsView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    termAndConditionsText: {
      flex: 1,
      marginStart: moderateScale(16),
      marginEnd: moderateScale(10),
      color: colors.natural.natural900,
    },
    termsAndConditionsParentView: {
      width: '100%',
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(16),
      paddingHorizontal: moderateScale(18),
      paddingVertical: moderateScale(12),
      marginBottom: moderateScale(16),
    },
    checkContainer: {
      flexDirection: 'row',
      gap: moderateScale(16),
      alignItems: 'center',
    },
  });
export default termsAndConditionBannerStyle;
