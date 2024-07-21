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
      backgroundColor: colors.natural.natural0,
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
    text: {
      textAlign: 'center',
    },
    manual: {
      marginTop: moderateScale(8),
      alignSelf: 'center',
      justifyContent: 'center',
      marginBottom: moderateScale(16),
    },
    manualList: {
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(16),
      paddingHorizontal: moderateScale(18),
      paddingVertical: moderateScale(16),
      gap: moderateScale(16),
      width: '100%',
      marginBottom: moderateScale(16),
    },
    iconHeader: {
      flexDirection: 'row',
      gap: moderateScale(8),
      alignItems: 'center',
    },
    listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

    image: {
      height: moderateScale(18),
      width: moderateScale(18),
    },
    amountInput2: {
      borderRadius: moderateScale(20),
      paddingTop: moderateScale(12),
      borderWidth: 1,
      borderColor: theme.primary.primary100,
      justifyContent: 'center',
      marginTop: moderateScale(16),
      alignItems: 'center',
    },
    header: {
      paddingHorizontal: moderateScale(24),
      paddingTop: moderateScale(24),
      gap: moderateScale(8),
    },
  });

export default sendGiftStyles;
