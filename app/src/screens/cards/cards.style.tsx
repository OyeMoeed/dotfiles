import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const cardStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingTop: scaleFont(16),
    },
    cardsContainer: {
      alignItems: 'center',
    },
    topDetails: {
      paddingHorizontal: scaleFont(24),
      marginBottom: verticalScale(12),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // TO KEEP BUTTONS PRESSABLE WHEN THE SHEET IS OPEN
      zIndex: 2,
    },
    noResultContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: scaleFont(100),
    },
    buttonStyle: {
      marginTop: scaleFont(24),
    },
    newCardWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      height: verticalScale(325),
      marginTop: scaleFont(35),
      marginLeft: scaleFont(80),
      width: scaleSize(220),
      backgroundColor: themeColors.natural.natural0,
      borderRadius: scaleFont(28),
    },
    sheetHeader: {
      borderRadius: scaleFont(28),
    },
    sheetBackground: {
      backgroundColor: themeColors.primary.primary10,
      borderRadius: scaleFont(28),
    },
    actionSheetStyle: {
      bottom: verticalScale(80),
    },
  });

export default cardStyles;
