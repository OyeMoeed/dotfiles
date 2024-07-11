import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { verticalScale } from 'react-native-size-matters';

const IPayCardSelectorStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    containerStyle: {
      marginTop: verticalScale(12),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerText: {
      color: colors.natural.natural500,
    },
    addButton: {
      paddingHorizontal: scaleSize(12),
    },
    itemContainer: {
      marginVertical: scaleSize(5),
      borderRadius: scaleSize(8),
      overflow: 'hidden',
      width: '100%',
    },
    flatlist: {
      marginTop: verticalScale(12),
      flex: 0,
    },
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      backgroundColor: colors.backgrounds.greyOverlay,
      borderRadius: scaleSize(16),
      paddingVertical: scaleSize(12),
      paddingHorizontal: scaleSize(18),
    },
    container: {
      flex: 1,
    },
    itemContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textContainer: {
      marginLeft: scaleSize(10),
    },
    itemText: {
      color: colors.natural.natural900,
    },
    subtitleText: {
      color: colors.natural.natural500,
    },
  });

export default IPayCardSelectorStyles;
