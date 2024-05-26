import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { variants } from '@app/utilities/enums.util';

const styles = (colors) =>
  createStyleSheet({
    container: {
      borderRadius: 10,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16
    },
    [variants.NORMAL]: {
      shadowColor: colors.natural1000,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3
    },
    [variants.PRIMARY]: {
      shadowColor: colors.natural1000,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 5
    },
    [variants.SECONDARY]: {
      shadowColor: colors.natural1000,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 10
    }
  });

export default styles;
