import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const IPayTopUpSelectionStyles = (colors) =>
  createStyleSheet({
    itemContainer: {
      marginVertical: scaleSize(5), // Space between items
      borderRadius: scaleSize(16), // Rounded corners
      overflow: 'hidden', // Clips child views to border radius
    },
    flatlist: {
      flex: 0,
    },
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', // Align icons and text properly
      width: scaleSize(300),
      backgroundColor: colors.natural.natural0, // Background for the card
      paddingVertical: scaleSize(12),
      paddingHorizontal: scaleSize(18),
    },
    itemContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemText: {
      marginLeft: scaleSize(10),
    },
  });

export default IPayTopUpSelectionStyles;
