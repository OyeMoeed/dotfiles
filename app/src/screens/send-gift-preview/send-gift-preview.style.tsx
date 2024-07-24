import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { FONT_SIZE_8 } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const sendGiftPreviewStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    message: {
      fontSize: FONT_SIZE_8,
      justifyContent: 'flex-start',
      backgroundColor: colors.natural.natural0,
      height: verticalScale(256),
      borderRadius: moderateScale(16),
    },
    inputContainer: { marginHorizontal: moderateScale(24), marginTop: moderateScale(24), flex: 1 },
    input: { textAlignVertical: 'top', height: verticalScale(230) },
    assistiveText: { textAlign: 'right' },
    buttonContainer: { marginHorizontal: moderateScale(24), marginBottom: moderateScale(24), gap: moderateScale(16) },
  });

export default sendGiftPreviewStyles;
