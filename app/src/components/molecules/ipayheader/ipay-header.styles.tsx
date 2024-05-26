
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const headerStyles = (colors: any) =>
  createStyleSheet({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scaleSize(24)

    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: scaleSize(4)
    },
    title: {
      color: colors.primary.primary900,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    flexStyles: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center'

    },
    rightStyles: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: scaleSize(4)
    },
    back: {
      color: colors.primary.primary500
    }
  });

export default headerStyles;
