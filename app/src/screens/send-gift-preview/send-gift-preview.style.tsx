import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { FONT_SIZE_13, FONT_SIZE_14, FONT_SIZE_8 } from '@app/styles/typography.styles';
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
    input: { textAlignVertical: 'top', height: verticalScale(230), paddingLeft: 0 },
    assistiveText: { textAlign: 'right' },
    buttonContainer: {
      marginTop: moderateScale(12),
      marginBottom: moderateScale(24),
      gap: moderateScale(16),
    },
    bottomSheetContainer: {
      flex: 1,
      width: '100%',
      height: moderateScale(500),
      marginHorizontal: moderateScale(24),
      marginTop: moderateScale(12),
    },
    logoStyles: {
      width: verticalScale(70),
      height: verticalScale(23),
    },
    smallAlinmaLogo: {
      height: moderateScale(23),
      width: moderateScale(75),
    },
    previewContainer: {
      backgroundColor: colors.backgrounds.skyBlue,
      borderRadius: moderateScale(12),
      alignItems: 'center',
      marginHorizontal: moderateScale(36),
      height: moderateScale(415),
      width: moderateScale(295),
      paddingTop: moderateScale(24),
      alignSelf: 'center',
    },
    image: { width: moderateScale(130), height: moderateScale(120), marginBottom: verticalScale(25) },
    amount: { flexDirection: 'row', alignItems: 'center', gap: scaleSize(2) },
    messagePreview: {
      marginTop: moderateScale(50),
      marginHorizontal: moderateScale(24),
    },

    messageText: {
      textAlign: 'center',
      fontSize: FONT_SIZE_13,
    },

    messagePreviewText: {
      textAlign: 'center',
      marginBottom: verticalScale(23),
      fontSize: FONT_SIZE_14,
    },
    playIcon: {
      height: moderateScale(14),
      width: moderateScale(14),
    },
  });

export default sendGiftPreviewStyles;
