import colors from '@app/styles/colors.const';
import { scaleSize, SCREEN_WIDTH } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const sendGiftStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    sendGiftImage: { alignItems: 'center', marginTop: moderateScale(48), marginBottom: moderateScale(46) },
    sendGiftDescription: {
      alignItems: 'flex-start',
      width: SCREEN_WIDTH / moderateScale(1.5),
      marginHorizontal: moderateScale(40),
      gap: moderateScale(16),
    },
    sendButton: {
      backgroundColor: colors.primary.primary500,
      marginTop: scaleSize(36),
      paddingHorizontal: scaleSize(20),
      paddingVertical: scaleSize(14),
      borderRadius: scaleSize(16),
    },
    buttonText: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default sendGiftStyles;
