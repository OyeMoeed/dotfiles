import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const amountStyles = (colors) =>
  createStyleSheet({
    safeAreaView: {
      flex: 1,
      marginHorizontal: scaleSize(24),
      marginTop: scaleSize(22),
    },
    expandedContainer: {
      alignSelf: 'center',
      paddingHorizontal: scaleSize(20),
    },
    cardContainer: {
      paddingVertical: scaleSize(32),
      paddingHorizontal: scaleSize(25),
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(16),
      marginBottom: scaleSize(24),
    },
    outerCOntainerStyles: { width: '100%', alignSelf: 'center' },

    amountContainer: {
      marginBottom: scaleSize(24),
      alignItems: 'center',
      justifyContent: 'center',
    },
    chipContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    inputContainer: {
      flexDirection: 'row',
      marginTop: verticalScale(10),
    },
    textAmount: {
      color: colors.natural.natural300,
      lineHeight: scaleSize(36),
      fontWeight: FONT_WEIGHT_BOLD,
    },
    currencyText: {
      marginLeft: scaleSize(5),
      color: colors.natural.natural300,
      fontWeight: FONT_WEIGHT_BOLD,
    },
    inputRow: {
      marginTop: scaleSize(12),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    inputToggle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: scaleSize(16),
    },
    inputField2: {
      width: scaleSize(135),
      marginLeft: scaleSize(5),
      backgroundColor: colors.natural.natural0,
      paddingRight: scaleSize(40),
    },
    inputField3: {
      width: scaleSize(135),
      borderRadius: moderateScale(16),
      backgroundColor: colors.natural.natural0,
      borderColor: colors.primary.primary100,
    },
    inputField: {
      marginTop: scaleSize(12),
      backgroundColor: colors.natural.natural0,
    },
    cardNameInput: {
      width: scaleSize(275),
      marginTop: scaleSize(12),
      backgroundColor: colors.natural.natural0,
      paddingRight: scaleSize(40),
    },
    toast: {
      position: 'absolute',
      bottom: verticalScale(40),
      width: '100%',
      left: verticalScale(0),
    },

    enterCardDetailsText: {
      color: colors.natural.natural500,
      alignSelf: 'flex-start',
    },
    totalAmount: {
      marginRight: scaleSize(2),
      fontWeight: FONT_WEIGHT_BOLD,
    },
    amountValues: {
      flexDirection: 'row',
    },
    topUpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: scaleSize(8),
    },
    progressBar: {
      backgroundColor: colors.primary.primary100,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: scaleSize(24),
    },
    buttonBg: {
      minWidth: scaleSize(80),
      backgroundColor: colors.secondary.secondary100,
      paddingVertical: scaleSize(8),
      borderRadius: scaleSize(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
    payButton2: {
      paddingVertical: scaleSize(14),
      borderRadius: scaleSize(10),
      justifyContent: 'center',
      height: scaleSize(45),
    },
    payButton: {
      borderRadius: scaleSize(4),
      justifyContent: 'center',
      alignItems: 'center',
      height: scaleSize(36),
    },
  });

export default amountStyles;
