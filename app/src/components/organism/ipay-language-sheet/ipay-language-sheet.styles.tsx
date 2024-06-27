import { constants } from '@app/components/atoms/ipay-text/constants.text';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
const styles = (colors: any) =>
  createStyleSheet({
    cancelButtonText: {
      color: colors.primary.primary500,
    },
    container: {
      flex: 1,
      paddingHorizontal: scaleSize(16),
    },
    renderLanguage: {
      paddingHorizontal: scaleSize(10),
    },
    grabber: {
      backgroundColor: colors.natural.natural300,
      width: scaleSize(34),
      height: scaleSize(5),
      borderRadius: scaleSize(3),
      alignSelf: 'center',
    },
    buttonBox: {
      height: scaleSize(48),
      borderRadius: scaleSize(20),
      marginTop: scaleSize(8),
      paddingHorizontal: scaleSize(18),
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.natural.natural0,
      flexDirection: 'row',
      width: '100%',
    },
    cancelButton: {
      position: 'absolute',
      top: scaleSize(3),
      paddingTop: scaleSize(8),
      padding: scaleSize(15),
      zIndex: 500,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
    },
    rowInner: {
      flexDirection: 'row',
      gap: scaleSize(16),
      alignItems: 'center',
    },
    rowHeader: {
      paddingVertical: scaleSize(10),
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleText: {
      fontWeight: constants.FONT_WEIGHT_BOLD,
      flex: 1, // Take up remaining space
      textAlign: 'center', // Center text horizontally
      color: colors.primary.primary900,
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: scaleSize(16),
    },
    languageTextStyle: {
      color: colors.natural.natural900,
    },
  });

export default styles;
