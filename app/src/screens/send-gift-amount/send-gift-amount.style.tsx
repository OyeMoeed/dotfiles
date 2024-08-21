import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_33 } from '@app/styles/typography.styles';
import { moderateScale } from 'react-native-size-matters';

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
    text2: {
      marginBottom: moderateScale(2),
    },
    amountInput: {
      justifyContent: 'center',
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
      borderRadius: moderateScale(28),
      flex: 0,
      backgroundColor: theme.appGradient.buttonBackground,
      padding: moderateScale(16),
    },
    buttonContainerNormal: {
      backgroundColor: theme.transparent,
      gap: moderateScale(16),
      bottom: moderateScale(0),
      left: moderateScale(0),
      right: moderateScale(0),
      marginBottom: moderateScale(32),
      marginHorizontal: moderateScale(24),
      flex: 0,
    },
    amountText: {
      color: themeColors.primary.primary800,
    },
    text: {
      textAlign: 'center',
    },
    manual: {
      marginTop: moderateScale(4),
      alignSelf: 'center',
      justifyContent: 'center',
      marginBottom: moderateScale(16),
    },
    manualList: {
      backgroundColor: themeColors.natural.natural0,
      borderRadius: moderateScale(16),
      paddingHorizontal: moderateScale(18),
      paddingVertical: moderateScale(16),
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
      height: moderateScale(20),
      width: moderateScale(20),
    },
    nonAlinmaList: {
      marginTop: moderateScale(8),
      backgroundColor: theme.natural.natural0,
      borderRadius: moderateScale(16),
    },
    chipContainer2: { marginHorizontal: moderateScale(18), marginTop: moderateScale(16) },
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
    remove: {
      marginTop: moderateScale(16),
    },

    input: {
      marginVertical: moderateScale(0),
    },
    manualInput: {
      fontSize: FONT_SIZE_20,
      alignSelf: 'center',
      lineHeight: 0,
    },
    chipColors: {
      alignSelf: 'stretch',
      backgroundColor: themeColors.secondary.secondary100,
      color: themeColors.secondary.secondary500,
    },

    chipContainer: {
      marginTop: moderateScale(16),
    },
    currencyManual: {
      fontSize: FONT_SIZE_17,
      alignSelf: 'center',
    },
    contactInfoContainer: {
      marginTop: moderateScale(12),
      flexDirection: 'row',
      gap: moderateScale(2),
      marginBottom: moderateScale(10),
    },
    manualContactInfoContainer: {
      marginTop: moderateScale(12),
      flexDirection: 'row',
      marginBottom: moderateScale(12),
      gap: moderateScale(2),
    },
    listTextStyle: { color: colors.primary.primary800 },
    sar: { fontSize: FONT_SIZE_33 },
  });

export default sendGiftAmountStyles;
