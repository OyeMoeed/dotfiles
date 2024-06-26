import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const componentHeaderStyles = (colors: any) =>
  createStyleSheet({
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scaleSize(16),
      justifyContent: 'space-between'
    },
    textContainer: {
      flex: 1,
      marginLeft: scaleSize(8),
    },
    headerText: {
      color: colors.primary.primary900,
    },
    subtitleText: {
      marginTop: scaleSize(4),
    },
    cardIconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: scaleSize(8),
    },
    icon: {
      marginLeft: scaleSize(8),
    }
  });

export default componentHeaderStyles;

