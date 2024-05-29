import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const alertStyles = (colors: any) =>
  createStyleSheet({
    flexStyles: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textsView: {
      gap: scaleSize(12),
    },
    modalTitle: {
      color: colors.primary.primary800,
      textAlign: 'center',
    },
    modalMessage: {
      color: colors.primary.primary600,
      textAlign: 'center',
    },
    centeredView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: colors.greyPalette.greyOverlay,
      borderRadius: scaleSize(28),
      padding: scaleSize(20),
      alignItems: 'center',
      gap: scaleSize(20),
      shadowColor: colors.darkColorPalette.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: scaleSize(4),
      elevation: scaleSize(5),
      width: '80%',
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
      color: colors.lightColorPalette.white,
      textAlign: 'center',
    },
  });

export default alertStyles;
