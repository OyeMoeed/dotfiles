import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale } from 'react-native-size-matters';

const sendGiftStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    tabs: {
      marginHorizontal: moderateScale(24),
      gap: moderateScale(8),
      marginBottom: moderateScale(24),
      marginTop: moderateScale(14),
    },
    unselectedTab: { backgroundColor: colors.natural.natural0, borderRadius: moderateScale(10) },
    noResult: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    sendButton: {
      backgroundColor: colors.primary.primary500,
      marginTop: scaleSize(20),
      paddingHorizontal: scaleSize(20),
      paddingVertical: scaleSize(10),
      borderRadius: scaleSize(16),
    },
  });

export default sendGiftStyles;
