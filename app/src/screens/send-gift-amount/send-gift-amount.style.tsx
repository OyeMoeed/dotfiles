import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_33 } from '@app/styles/typography.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const sendGiftAmountStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24),
      marginTop: moderateScale(20),
      gap: moderateScale(2),
      marginBottom: moderateScale(10),
    },
    amountComponent: {
      flex: 0.5,
      backgroundColor: themeColors.natural.natural0,
      gap: moderateScale(8),
      borderRadius: moderateScale(28),
    },
    manualComponent: {
      flex: 0.4,
      backgroundColor: themeColors.natural.natural0,
      gap: moderateScale(8),
      borderRadius: moderateScale(24),
    },

    amountInput: {
      justifyContent: 'center',
      marginTop: moderateScale(16),
      alignItems: 'center',
    },
    contactList: {
      flex: 0.3,
    },
    manualContactList: { flex: 0.6, marginTop: moderateScale(12) },
    checkmarkPoints: {
      backgroundColor: themeColors.natural.natural0,
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
      gap: moderateScale(16),
      bottom: moderateScale(0),
      left: moderateScale(0),
      right: moderateScale(0),
      marginBottom: moderateScale(32),
      marginHorizontal: moderateScale(24),
    },
    amountText: {
      color: themeColors.primary.primary800,
    },
    text: {
      textAlign: 'center',
    },
    manual: {
      alignSelf: 'center',
      justifyContent: 'center',
      marginBottom: moderateScale(16),
    },
    manualList: {
      backgroundColor: themeColors.natural.natural0,
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
    listHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    image: {
      height: verticalScale(18),
      width: scale(18),
    },
    amountInput2: {
      borderRadius: moderateScale(20),
      paddingTop: moderateScale(12),
      borderWidth: 1,
      borderColor: themeColors.primary.primary100,
      justifyContent: 'center',
      marginTop: moderateScale(16),
      alignItems: 'center',
    },
    header: {
      paddingHorizontal: moderateScale(24),
      paddingTop: moderateScale(32),
      gap: moderateScale(8),
    },
    contactInfoContainer: {
      marginTop: moderateScale(12),
      flexDirection: 'row',
      gap: moderateScale(2),
      marginBottom: moderateScale(10),
    },
    manualContactInfoContainer: {
      flexDirection: 'row',
      marginBottom: moderateScale(12),
      gap: moderateScale(2),
    },
    listTextStyle: { color: colors.primary.primary800 },
    sar: { fontSize: FONT_SIZE_33 },
  });

export default sendGiftAmountStyles;
