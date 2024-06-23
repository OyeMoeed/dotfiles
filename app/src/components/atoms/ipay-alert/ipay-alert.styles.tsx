import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';
import { constants } from '../ipay-text/constants.text';

const alertStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    flexStyles: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    borderRadius: {
      borderRadius: scaleSize(10),
    },
    textsView: {
      gap: scaleSize(12),
    },
    modalTitle: {
      color: themeColors.primary.primary800,
      textAlign: 'center',
      fontWeight: constants.FONT_WEIGHT_BOLD,
    },
    modalMessage: {
      color: themeColors.primary.primary800,
      textAlign: 'center',
      marginBottom: scaleSize(10),
    },
    centeredView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: themeColors.natural.natural100,
      borderRadius: scaleSize(28),
      padding: scaleSize(20),
      alignItems: 'center',
      gap: scaleSize(20),
      shadowColor: themeColors.natural.natural1000,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: scaleSize(4),
      elevation: scaleSize(5),

      width: moderateScale(280, 0.5),
    },
    sideBySideContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: scaleSize(8),
    },
    buttonContainer: {
      width: '100%',
      gap: scaleSize(8),
    },
    buttonTextColored: {
      color: colors.primary.primary500,
      textAlign: 'center',
    },

    buttonTextWhite: {
      color: themeColors.natural.natural0,
      textAlign: 'center',
    },
  });

export default alertStyles;
