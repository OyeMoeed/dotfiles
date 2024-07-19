import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const sendGiftStyles = (theme: typeof colors) =>
  createStyleSheet({
    container: {
      marginHorizontal: moderateScale(24),
      marginTop: moderateScale(20),
      gap: moderateScale(12),
    },
    amountComponent: {
      backgroundColor: theme.natural.natural0,
      padding: moderateScale(24),
      gap: moderateScale(8),
      borderRadius: moderateScale(24),
    },
    amountInput: {
      justifyContent: 'center',
      marginTop: moderateScale(16),
      alignItems: 'center',
    },
    contactList: { flex: 0 },
    checkmarkPoints: {
      backgroundColor: colors.backgrounds.greyOverlay,
      flexDirection: 'row',
      borderRadius: moderateScale(16),
      paddingHorizontal: moderateScale(18),
      paddingVertical: moderateScale(16),
      alignItems: 'center',
      gap: moderateScale(16),
      width: '100%',
      marginBottom: moderateScale(16),
    },
    buttonContainer: {
      position: 'absolute',
      bottom: moderateScale(0),
      left: moderateScale(0),
      right: moderateScale(0),
      marginBottom: moderateScale(32),
      marginHorizontal: moderateScale(24),
    },
    amountText: {
      color: theme.primary.primary800,
    },
  });

export default sendGiftStyles;
