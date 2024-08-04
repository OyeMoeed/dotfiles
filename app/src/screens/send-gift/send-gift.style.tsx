import { scaleSize, SCREEN_WIDTH } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale } from 'react-native-size-matters';

const sendGiftStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    sendGiftImage: { alignItems: 'center', marginTop: scaleSize(48), marginBottom: scaleSize(46) },
    sendGiftDescription: {
      alignItems: 'flex-start',
      width: SCREEN_WIDTH / moderateScale(1.5),
      marginHorizontal: scaleSize(24),
      gap: scaleSize(16),
    },
    sendButton: {
      backgroundColor: colors.primary.primary500,
      alignItems: 'center',
      marginTop: scaleSize(20),
      paddingHorizontal: scaleSize(20),
      marginVertical: scaleSize(10),
      borderRadius: scaleSize(16),
    },
  });

export default sendGiftStyles;
