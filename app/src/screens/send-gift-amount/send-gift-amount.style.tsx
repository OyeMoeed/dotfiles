import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import {
  FONT_SIZE_17,
  FONT_SIZE_20,
  FONT_SIZE_33,
  FONT_SIZE_34,
  FONT_WEIGHT_BOLD,
} from '@app/styles/typography.styles';
import { Platform } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const sendGiftAmountStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    recipientsContainer: {
      backgroundColor: colors.secondary.secondary100,
      marginTop: moderateScale(6),
      alignSelf: 'center',
    },
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
      marginBottom: moderateScale(8),
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
      marginHorizontal: moderateScale(24),
      gap: moderateScale(16),
      bottom: moderateScale(0),
      left: moderateScale(0),
      right: moderateScale(0),
      marginBottom: moderateScale(18),
      borderRadius: moderateScale(28),
      flex: 0,
      backgroundColor: themeColors.appGradient.buttonBackground,
      padding: moderateScale(16),
    },
    buttonContainerNormal: {
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
      marginBottom: moderateScale(8),
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
      backgroundColor: themeColors.natural.natural0,
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
      marginTop: moderateScale(6),
    },

    input: {
      paddingVertical: moderateScale(12),
      marginVertical: moderateScale(2),
    },
    manualInput: {
      fontSize: FONT_SIZE_20,
      alignSelf: 'center',
      ...Platform.select({
        android: {
          lineHeight: moderateScale(30),
        },
        ios: {
          lineHeight: 0,
        },
      }),
      minWidth: scaleSize(42),
    },
    chipColors: {
      alignSelf: 'stretch',
      backgroundColor: themeColors.secondary.secondary100,
      color: themeColors.secondary.secondary500,
    },

    chipContainer: {
      marginTop: moderateScale(16),
    },
    currencyText: {
      fontSize: FONT_SIZE_34,
      fontWeight: FONT_WEIGHT_BOLD,
      ...Platform.select({
        android: {
          paddingTop: moderateScale(24),
          lineHeight: moderateScale(30),
        },
        ios: {
          lineHeight: 0,
          marginBottom: moderateScale(2),
        },
      }),
    },
    currencyManual: {
      fontSize: FONT_SIZE_17,
      ...Platform.select({
        android: {
          paddingTop: moderateScale(15),
        },
        ios: {
          paddingTop: moderateScale(3),
        },
      }),
      alignSelf: 'center',
      marginBottom: moderateScale(3),
    },
    contactInfoContainer: {
      marginTop: moderateScale(6),
      flexDirection: 'row',
      gap: moderateScale(2),
    },
    manualContactInfoContainer: {
      flexDirection: 'row',
      marginBottom: moderateScale(12),
      gap: moderateScale(2),
    },
    listTextStyle: { color: colors.primary.primary800 },
    sar: { fontSize: FONT_SIZE_33 },
    btnText: {
      justifyContent: 'center',
    },
    inputStyle: {
      minWidth: scaleSize(65),
      textAlign: 'right',
      color: themeColors.primary.primary900,
    },
    inputActiveStyle: {
      color: themeColors.primary.primary900,
      ...Platform.select({
        android: {
          marginBottom: moderateScale(5),
        },
        ios: {
          marginBottom: moderateScale(7),
        },
      }),
    },
  });

export default sendGiftAmountStyles;
