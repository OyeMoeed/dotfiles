import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { verticalScale } from 'react-native-size-matters';

const shareableViewStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: colors.critical.critical850,
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    capturedImage: {
      marginTop: 16,
      width: '100%',
      height: 200,
      resizeMode: 'contain',
    },
    buttonContainer: {
      marginTop: verticalScale(16),
    },
  });

export default shareableViewStyles;
